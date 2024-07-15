const express = require('express');
const { Docker } = require('node-docker-api');
const crypto = require('crypto');
const { Docker: DockerModel, User } = require('../models'); // Asegúrate de que estos nombres son correctos
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
const docker = new Docker();

const DOCKER_IMAGE_PREFIX = 'ctf_exercise_';

// FUNCIONES DE DOCKER

const startDocker = async (exerciseId) => {
    const container = await docker.container.get(exerciseId);
    await container.start();
    console.log(`Started Docker container with ID: ${exerciseId}`);
};

const stopDocker = async (exerciseId) => {
    const container = await docker.container.get(exerciseId);
    await container.stop();
    console.log(`Stopped Docker container with ID: ${exerciseId}`);
};

const deleteDocker = async (exerciseId) => {
    const container = await docker.container.get(exerciseId);
    await container.stop();
    await container.delete();
    console.log(`Deleted Docker container with ID: ${exerciseId}`);
};

// Función para crear el contenedor Docker de un ejercicio
const createDockerContainer = async (exerciseId, flag) => {
    const getPort = (await import('get-port')).default;
    const hostPort = await getPort();
    const container = await docker.container.create({
        Image: `${DOCKER_IMAGE_PREFIX}${exerciseId}`,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Env: [`FLAG=${flag}`, `PORT=${hostPort}`], // Generar variables de entorno de puerto y flag para el contenedor.
        ExposedPorts: { [`${hostPort}/tcp`]: {} },
        HostConfig: {
            PortBindings: { [`${hostPort}/tcp`]: [{ HostPort: `${hostPort}` }] }
        }
    });
    await container.start();
    console.log(`Started Docker container with ID: ${container.id} on port: ${hostPort}`);
    return { container, hostPort };
};

// FUNCIONES DE BASE DE DATOS READ ONLY

const hasUserActiveExercise = async (userid) => {
    const exercise = await DockerModel.findOne({ where: { User: userid, Estado: 'activo' } });
    return exercise;
};

const isActiveExerciseSelected = async (userid, exerciseId) => {
    const exercise = await DockerModel.findOne({ where: { User: userid, ExerciseID: exerciseId, Estado: 'activo' } });
    return exercise;
};

const hasUserSelectedExerciseDeactivated = async (userid, exerciseId) => {
    console.log(`Checking if user: ${userid} has selected exercise: ${exerciseId} deactivated`);
    const exercise = await DockerModel.findOne({ where: { User: userid, ExerciseID: exerciseId, Estado: 'inactivo' } });
    return exercise;
};

// FUNCIONES DE BASE DE DATOS WRITE

const activateSelectedExercise = async (dockerId, userid) => {
    await DockerModel.update({ Estado: 'activo' }, { where: { DockerID: dockerId } });
    await User.update({ ariketa_activa: dockerId }, { where: { userid } });
};

const desactivateActiveExercise = async (userid) => {
    console.log(`Desactivating active Docker container for user: ${userid}`);
    const exercise = await DockerModel.findOne({ where: { User: userid, Estado: 'activo' } });
    if (exercise) {
        await deactivateExercise(exercise);
    }   
};

const deactivateExercise = async (exercise)  =>{
    console.log(`Desactivating Docker container with ID: ${exercise.DockerID} for user: ${exercise.user}`);
    await DockerModel.update({ Estado: 'inactivo' }, { where: { DockerID: exercise.DockerID } });
    await User.update({ ariketa_activa: null }, { where: { userid: exercise.User } });
    await stopDocker(exercise.DockerID);
}

const saveExerciseDockerInDB = async (dockerId, flag, userid, exerciseId, hostPort) => {
    console.log(`Saving Docker container in database with ID: ${dockerId}, flag: ${flag}, port: ${hostPort}, for user: ${userid}, exercise type: ${exerciseId}`);
    await DockerModel.create({
        DockerID: dockerId,
        ExerciseID: exerciseId,
        Estado: 'activo',
        Flag: flag,
        User: userid,
        Puerto: hostPort
    });
    await User.update({ ariketa_activa: dockerId }, { where: { userid } });
};

const finalizeExercise = async (exercise) => {
    await DockerModel.update({ Estado: 'finalizado' }, { where: { DockerID: exercise.DockerID } });
    await User.update({ ariketa_activa: null }, { where: { userid: exercise.User } });
    await deleteDocker(exercise.DockerID);

    console.log(`Exercise with Docker ID: ${exercise.DockerID} finalized successfully`);
};

// OTRAS FUNCIONES

const generateRandomHash = () => {
    return crypto.randomBytes(24).toString('base64').replace(/=+$/, '').substring(0, 32);
};

const checkUserResponse = async (exerciseId, userId, userResponse) => {
    const exercise = await DockerModel.findOne({ where: { ExerciseID: exerciseId, User: userId, Estado: 'activo' } });
    if (!exercise) {
        throw new Error('Exercise not found or not active');
    }

    const flag = exercise.Flag;
    const isCorrect = flag === userResponse;
    
    if (isCorrect) {
        await finalizeExercise(exercise);
    }
    
    return isCorrect;
};

// RUTA PARA GESTIONAR LA CREACIÓN DEL EJERCICIO
router.post('/exercises', authenticateToken, async (req, res) => {
    let container;
    try {
        if (!req.user || !req.user.userid) {
            return res.status(400).json({ message: 'User ID not found in request' });
        }

        const userId = req.user.userid;
        const exerciseId = req.body.exerciseId;
         console.log ("User id:", userId)
        const activeExercise = await hasUserActiveExercise(userId);
        if (activeExercise) {
            if (await isActiveExerciseSelected(userId, exerciseId)) {
                return res.status(400).json({ message: 'User has already selected this exercise' });
            } else {
                await desactivateActiveExercise(userId);
            }
        }

        const deactivatedExercise = await hasUserSelectedExerciseDeactivated(userId, exerciseId);
        if (deactivatedExercise) {
            await activateSelectedExercise(deactivatedExercise.DockerID, userId);
            await startDocker(deactivatedExercise.DockerID);
            res.status(201).json({ message: 'Exercise Docker reactivated successfully', flag: deactivatedExercise.Flag, port: deactivatedExercise.Puerto});

        } else {
            const flag = generateRandomHash();
            const result = await createDockerContainer(exerciseId, flag);
            container = result.container;
            const hostPort = result.hostPort;
            await saveExerciseDockerInDB(container.id, flag, userId, exerciseId, hostPort);

            res.status(201).json({ message: 'Exercise Docker activated successfully', flag, port: hostPort });
        }
    } catch (err) {
        console.error('Error while creating exercise Docker:', err);
        if (container) {
            await container.stop();
            await container.delete();
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/exercises/check', authenticateToken, async (req, res) => {
    try {
        if (!req.user || !req.user.userid) {
            return res.status(400).json({ message: 'User ID not found in request' });
        }

        const userId = req.user.userid;
        const { exerciseId, userResponse } = req.body;

        // Verificar que el usuario ha enviado una respuesta
        if (!userResponse) {
            return res.status(400).json({ message: 'No response provided' });
        }

        // Comprobar la respuesta del usuario
        const isCorrect = await checkUserResponse(exerciseId, userId, userResponse);

        res.status(200).json({ correct: isCorrect });
    } catch (err) {
        console.error('Error while checking exercise Docker:', err);
        if (err.message === 'Exercise not found or not active') {
            return res.status(404).json({ message: err.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Ruta para gestionar la eliminación del ejercicio.
router.delete('/exercises/:exerciseId', authenticateToken, async (req, res) => {
    try {
        const exerciseId = req.params.exerciseId;
        const userId = req.user.userid; // Obtener el ID del usuario autenticado
        console.log(`Received request to delete exercise Docker container with exercise ID: ${exerciseId} for user: ${userId}`);

        // Verificar que el ejercicio pertenece al usuario
        const exercise = await DockerModel.findOne({ where: { ExerciseID: exerciseId, User: userId, Estado: 'activo' } });
        if (!exercise) {
            return res.status(404).json({ message: 'No existe el ejercicio o no esta activo' });
        }

        await deactivateExercise(exercise);

        console.log(`Stoped Docker container with exercise ID: ${exerciseId}`);
        res.status(200).json({ message: `Exercise Docker for ID ${exerciseId} stoped successfully` });
    } catch (err) {
        console.error('Error while deleting exercise Docker:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/hello', (req, res) => {
    res.send('Micmic');
});

module.exports = router;

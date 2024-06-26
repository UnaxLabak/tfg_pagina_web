const express = require('express');
const { Docker } = require('node-docker-api');
const crypto = require('crypto');
const { Docker: DockerModel } = require('../models');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();
const docker = new Docker();

const DOCKER_IMAGE_PREFIX = 'ctf_exercise_';

const generateRandomHash = () => {
    return crypto.randomBytes(24).toString('base64').replace(/=+$/, '').substring(0, 32);
};

// Función para crear el contenedor Docker de un ejercicio
const createDockerContainer = async (exerciseId, flag) => {
    console.log(`Creating Docker container for exercise: ${exerciseId} with flag: ${flag}`);

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

const saveDockerInDB = async(dockerId, flag, userid) => {
    console.log(`Saving Docker container in database with ID: ${dockerId} and flag: ${flag} for user: ${userid}`);

    await DockerModel.create({
        Docker_ID: dockerId,
        AriketaZemb: 'example',
        Estado: 'activo',
        Flag: flag,
        user: userid
    });
}

const finalizarDocker = async(exerciseId) => {
    await DockerModel.update({ Estado: 'inactivo' }, { where: { Docker_ID: exerciseId } });
}

// Ruta para gestionar la creación del ejercicio.
router.post('/exercises', authenticateToken, async (req, res) => {
    try {
        console.log('Received request to create exercise Docker container');
        const flag = generateRandomHash();
        console.log(`Generated flag for the exercise: ${flag}`);
        console.log(`Request body: ${JSON.stringify(req.user)}`);
        const { container, hostPort } = await createDockerContainer(req.body.id, flag);

        // Asegúrate de que req.user.userId tiene un valor
        if (!req.user || !req.user.userid) {
            return res.status(400).json({ message: 'User ID not found in request' });
        }

        await saveDockerInDB(container.id, flag, req.user.userid);

        res.status(201).json({ message: 'Exercise Docker activated successfully', flag, port: hostPort });
    } catch (err) {
        console.error('Error while creating exercise Docker:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Ruta para gestionar la eliminación del ejercicio.
router.delete('/exercises/:exerciseId', authenticateToken, async (req, res) => {
    try {
        const exerciseId = req.params.exerciseId;
        console.log(`Received request to delete exercise Docker container with ID: ${exerciseId}`);

        const container = await docker.container.get(exerciseId);
        await container.stop();
        await container.delete();

        await finalizarDocker(exerciseId);

        console.log(`Deleted Docker container with ID: ${exerciseId}`);
        res.status(200).json({ message: `Exercise Docker for ID ${exerciseId} deleted successfully` });
    } catch (err) {
        console.error('Error while deleting exercise Docker:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/hello', (req, res) => {
    res.send('Micmic');
});

module.exports = router;

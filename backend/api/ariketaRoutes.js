const express = require('express');
const { Docker } = require('node-docker-api');
const crypto = require('crypto');

const router = express.Router();
const docker = new Docker();

const DOCKER_IMAGE_PREFIX = 'ctf_exercise_';

const generateRandomHash = () => {
    return crypto.randomBytes(24).toString('base64').replace(/=+$/, '').substring(0, 32);
};

// Funcion para crear el contenedor docker de un ejercicio
const createDockerContainer = async (exerciseId, flag) => {
    console.log(`Creating Docker container for exercise: ${exerciseId} with flag: ${flag}`);

    // Importar get port.
    const getPort = (await import('get-port')).default;

    // Conseguir un puerto dinamicamente.
    const hostPort = await getPort();

    const container = await docker.container.create({
        Image: `${DOCKER_IMAGE_PREFIX}${exerciseId}`,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Env: [`FLAG=${flag}`, `PORT=${hostPort}`], //Generar variables de entorno de puerto y flag para el contenedor.
        ExposedPorts: { [`${hostPort}/tcp`]: {} },
        HostConfig: {
            PortBindings: { [`${hostPort}/tcp`]: [{ HostPort: `${hostPort}` }] }
        }
    });
    await container.start();
    console.log(`Started Docker container with ID: ${container.id} on port: ${hostPort}`);
    return { container, hostPort };
};


// Ruta para gestionar la creacion del ejercicio.
router.post('/exercises', async (req, res) => {
    try {
        console.log('Received request to create exercise Docker container');
        // Generar flag para el ejercicio.
        const flag = generateRandomHash();

        console.log(`Generated flag for the exercise: ${flag}`);

        // Crear contenedor dockercon la flag.
        const { container, hostPort } = await createDockerContainer('example', flag);

        res.status(201).json({ message: 'Exercise Docker activated successfully', flag, port: hostPort });
    } catch (err) {
        console.error('Error while creating exercise Docker:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle exercise deletion
router.delete('/exercises/:exerciseId', async (req, res) => {
    try {
        const exerciseId = req.params.exerciseId;
        console.log(`Received request to delete exercise Docker container with ID: ${exerciseId}`);

        // Find and stop the Docker container
        const container = await docker.container.get(exerciseId);
        await container.stop();
        await container.delete();

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

<template>
  <div>
    <Boton @click="createUser" buttonText="Create User" />
    <Boton @click="activateDocker" buttonText="Activate Docker" />
  </div>
</template>

<script>
import Boton from '@/components/Boton.vue';

const baseURL = 'http://localhost:8000';

export default {
  layout: 'default',
  components: {
    Boton
  },
  methods: {
    async createUser() {
      try {
        const userData = {
          username: 'Mosimosi',
          password: 'password123'
        };

        const response = await fetch(baseURL + '/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 400 && data.error) {
            console.log(data.error)
          } else {
            throw new Error('HTTP error ' + response.status);
          }
        } else {
          console.log('User was created successfully:', data);
        }
      } catch (error) {
        console.error('An error occurred while creating the user:', error);
      }
    },
    async activateDocker() {
      try {
        const response = await fetch(baseURL + '/api/exercises', {
          method: 'POST',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        } else {
          console.log('Exercise Docker activated successfully:', data);
        }
      } catch (error) {
        console.error('An error occurred while activating the Docker:', error);
      }
    }
  }
}
</script>

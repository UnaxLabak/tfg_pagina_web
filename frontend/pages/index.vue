<template>
  <div>
    <Ariketa :id="1" statusColor="green" />
    <Ariketa :id="2" statusColor="orange" />
  </div>
</template>

<script>
import Boton from '@/components/Boton.vue';
import Ariketa from '@/components/Ariketa.vue';

const baseURL = 'http://localhost:8000';

export default {
  layout: 'default',
  components: {
    Boton,
    Ariketa
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
            console.log(data.error);
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

<style scoped>
/* Aquí puedes agregar estilos globales o específicos para esta página */
</style>

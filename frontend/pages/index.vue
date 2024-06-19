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

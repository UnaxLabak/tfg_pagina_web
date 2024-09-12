<template>
  <div>
    <AriketaStatus :activeExercise="activeExercise" />
    <Ariketa :id="1" statusColor="green" @exercise-activated="updateActiveExercise" />
    <Ariketa :id="2" statusColor="green" @exercise-activated="updateActiveExercise" />
    <Ariketa :id="3" statusColor="green" @exercise-activated="updateActiveExercise" />

  </div>
</template>

<script>
import Boton from '@/components/Boton.vue';
import Ariketa from '@/components/Ariketa.vue';
import AriketaStatus from '@/components/Status.vue';

const baseURL = 'http://localhost:8000';

export default {
  layout: 'default',
  components: {
    Boton,
    Ariketa,
    AriketaStatus
  },
  data() {
    return {
      activeExercise: null
    };
  },
  methods: {
    updateActiveExercise(exerciseData) {
      this.activeExercise = exerciseData;
    },
    async activateDocker() {
      try {
        const token = localStorage.getItem('loginToken');
        console.log(token)
        const response = await fetch(baseURL + '/docker/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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

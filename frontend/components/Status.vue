<template>
  <div class="status">
    <div v-if="loading">
      <p>Cargando...</p>
    </div>
    <div v-else-if="activeExercise">
      <p>Ejercicio activo: {{ activeExercise.id }}</p>
      <p>Puerto abierto: {{ activeExercise.port }}</p>
    </div>
    <div v-else>
      <p>No hay ejercicios activos.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeExercise: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.status {
  padding: 20px;
  background-color: #000; /* Fondo negro */
  border-radius: 8px;
  margin-bottom: 20px;
  color: #ccc; /* Texto gris */
}
</style>

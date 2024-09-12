<template>
  <div :class="['ariketa', `ariketa-${statusColor}`, { 'loading': isLoading }]">
    <div :style="{ backgroundColor: currentStatusColor }" class="status-indicator"></div>
    <button @click="createExercise" class="button">{{ buttonText }}</button>
    <input type="text" v-model="respuesta" placeholder="Inserta tu respuesta" class="respuesta-input" />
    <button @click="checkExercise" class="button">Comprobar</button>
    <button @click="deleteExercise" class="button delete-button">Desactivar</button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    statusColor: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: 'Crear Ariketa'
    }
  },
  data() {
    return {
      respuesta: '',
      currentStatusColor: 'red', // Color inicial del círculo
      isLoading: false // Estado de carga inicial
    };
  },
  methods: {
    async createExercise() {
      try {
        this.isLoading = true; // Activar estado de carga

        const token = localStorage.getItem('loginToken');
        const response = await fetch('http://localhost:8000/docker/exercises', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ exerciseId: this.id })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        this.currentStatusColor = this.statusColor; // Cambiar el color del círculo al éxito
        alert(`Ejercicio numero: ${this.id} ha sido creado. La flag es: ${data.flag} y el puerto abierto es: ${data.port}`);
        this.$emit('exercise-activated', { id: this.id, flag: data.flag, port: data.port });
      } catch (error) {
        alert(error.message || 'Error al crear el ejercicio Docker. Verifica la consola para más detalles.');
        console.error('Error al crear el ejercicio Docker:', error);
      } finally {
        this.isLoading = false; // Desactivar estado de carga, independientemente del resultado
      }
    },
    async checkExercise() {
      try {
        this.isLoading = true; // Activar estado de carga

        const token = localStorage.getItem('loginToken');
        const response = await fetch('http://localhost:8000/docker/exercises/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ exerciseId: this.id, userResponse: this.respuesta })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        if (data.correct) {
          alert('Respuesta correcta!');
          this.respuesta = ''; // Vaciar el contenedor de texto
        } else {
          alert('Respuesta incorrecta, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al comprobar el ejercicio:', error);
        if (error.message === 'No response provided') {
          alert('Por favor, proporciona una respuesta.');
        } else if (error.message === 'Exercise not found or not active') {
          alert('El ejercicio no está activo o no se encontró.');
        } else {
          alert('Error al comprobar el ejercicio. Verifica la consola para más detalles.');
        }
      } finally {
        this.isLoading = false; // Desactivar estado de carga, independientemente del resultado
      }
    },
    async deleteExercise() {
      try {
        this.isLoading = true; // Activar estado de carga

        const token = localStorage.getItem('loginToken');
        const response = await fetch(`http://localhost:8000/docker/exercises/${this.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        this.currentStatusColor = 'red'; // Cambiar el color del círculo al eliminar
        alert(`Ejercicio ID: ${this.id} ha sido eliminado.`);
      } catch (error) {
        console.error('Error al eliminar el ejercicio Docker:', error);
        alert(error.message || 'Error al eliminar el ejercicio Docker. Verifica la consola para más detalles.');
      } finally {
        this.isLoading = false; // Desactivar estado de carga, independientemente del resultado
      }
    }
  }
}
</script>

<style scoped>
.ariketa {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #000; /* Fondo negro */
  border-radius: 8px;
  margin-bottom: 20px;
}

.status-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
}

.button {
  display: inline-block;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 500;
  line-height: 1.25;
  text-align: center;
  color: #50f00c; /* Green text */
  background-color: #000000; /* Black background */
  border-radius: .375rem;
  padding: 1rem 2rem;
  text-decoration: none;
  transition: background-color .3s ease;
  margin-right: 20px;
}

.button:hover {
  background-color: #50f00c; /* Green background on hover */
  color: #000000; /* Black text on hover */
}

.delete-button {
  color: #ff0000; /* Red text */
  background-color: #000000; /* Black background */
}

.delete-button:hover {
  background-color: #ff0000; /* Red background on hover */
  color: #ffffff; /* White text on hover */
}

.respuesta-input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #222; /* Fondo gris oscuro */
  color: #fff; /* Texto blanco */
  margin-right: 20px;
}

.respuesta-input:focus {
  outline: none;
  background-color: #222; /* Mantiene el fondo gris oscuro al hacer clic */
}

.loading {
  opacity: 0.7; /* Reducir la opacidad para simular desactivación durante la carga */
  pointer-events: none; /* Desactivar eventos del mouse durante la carga */
  position: relative; /* Permitir posicionamiento absoluto de elementos hijos */
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border: 2px solid transparent;
  border-top-color: #50f00c; /* Color del borde de la animación de carga (verde) */
  border-radius: 50%;
  animation: spin 1s linear infinite; /* Animación de rotación */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

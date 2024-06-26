<template>
  <div :class="['ariketa', `ariketa-${statusColor}`]">
    <div :style="{ backgroundColor: currentStatusColor }" class="status-indicator"></div>
    <button @click="createAriketa" class="button">{{ buttonText }}</button>
    <input type="text" v-model="respuesta" placeholder="Inserta tu respuesta" class="respuesta-input" />
    <button @click="deleteAriketa" class="button delete-button">Eliminar</button>
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
  };
},
methods: {
  async createAriketa() {
    try {
      const token = localStorage.getItem('loginToken');
      const response = await fetch('http://localhost:8000/docker/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: "example" }) // Enviar ID del componente
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      this.currentStatusColor = this.statusColor; // Cambiar el color del círculo al éxito
      alert(`Ejercicio ID: ${this.id} ha sido creado. La flag es: ${data.flag} y el puerto abierto es: ${data.port}`);
    } catch (error) {
      console.error('Error al crear el ejercicio Docker:', error);
      alert('Error al crear el ejercicio Docker. Verifica la consola para más detalles.');
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
</style>

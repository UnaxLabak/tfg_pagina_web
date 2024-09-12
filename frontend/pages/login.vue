<template>
  <div class="auth-container">
    <h1 class="title">Inicio de Sesión</h1>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="username" class="label">Usuario</label>
        <input type="text" v-model="username" id="username" class="input-field" required />
      </div>
      <div class="input-group">
        <label for="password" class="label">Contraseña</label>
        <input type="password" v-model="password" id="password" class="input-field" required />
      </div>
      <button type="submit" class="button" :class="{ 'disabled': !isFormValid }" :disabled="!isFormValid">
        Iniciar Sesión
      </button>
      <p class="register-link">
        ¿No tienes cuenta? <router-link to="/register">Regístrate</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  computed: {
    isFormValid() {
      return this.username !== '' && this.password !== '';
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: this.username, password: this.password }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        const token = data.token;

        // Almacenar el token en localStorage para mantener la sesión
        localStorage.setItem('loginToken', token);

        // Redirigir a la página principal o donde sea necesario
        this.$router.push('/');
      } catch (error) {
        console.error('Error during login:', error);
        alert('Error durante el inicio de sesión');
      }
    }
  }
};
</script>


  
  <style scoped>
  .auth-container {
    width: 100%;
    max-width: 600px;
    margin: 100px auto;
    padding: 40px;
    background-color: #000;
    border-radius: 8px;
    color: #fff;
  }
  
  .title {
    font-size: 36px;
    text-align: left; /* Alinear título a la izquierda */
    margin-bottom: 30px;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .label {
    display: block; /* Mostrar etiquetas como bloques para ocupar ancho completo */
    font-size: 20px; /* Tamaño de fuente de las etiquetas */
    color: #50f00c;
    margin-bottom: 10px; /* Espacio inferior entre etiqueta y campo */
  }
  
  .input-field {
    width: 100%;
    padding: 16px; /* Aumentar el relleno para hacer los campos más grandes */
    font-size: 18px; /* Tamaño de fuente de los campos de entrada */
    border-radius: 4px;
    border: 1px solid #444;
    background-color: #222;
    color: #fff;
    box-sizing: border-box; /* Incluir padding y borde en el ancho total */
  }
  
  input:focus {
    outline: none;
    background-color: #222;
  }
  
  button {
    display: inline-block;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: 500;
    line-height: 1.25;
    text-align: center;
    color: #fff;
    background-color: #444;
    border-radius: 4px;
    padding: 16px; /* Aumentar el relleno para hacer el botón más grande */
    text-decoration: none;
    transition: background-color 0.3s ease;
    cursor: pointer;
    font-size: 18px; /* Tamaño de fuente del botón */
    width: 100%; /* Hacer que el botón ocupe el ancho completo */
    max-width: 100%; /* Asegurar que el botón no sea más ancho que el contenedor */
    box-sizing: border-box; /* Incluir padding y borde en el ancho total */
  }
  
  button:hover {
    background-color: #50f00c;
  }
  
  button.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .register-link {
    font-size: 18px; /* Tamaño de fuente del texto de registro */
    text-align: left; /* Alinear texto de registro a la izquierda */
    color: #fff;
    margin-top: 20px;
  }
  
  .register-link a {
    color: #50f00c;
    text-decoration: none;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  </style>
  
<template>
  <nav class="navbar">
    <div class="navbar-section logo">
      <Icon name="game-icons:virus" color="#50f00c" size="60" />
    </div>
    <div class="navbar-section nav-items">
      <ul>
        <li v-for="(link, index) in links" :key="index" class="nav-item">
          <router-link :to="link.to" class="nav-link" :class="{ active: isActive(link.to) }">
            <UIcon v-if="link.icon" :name="link.icon" class="nav-icon" />
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-section auth-buttons">
      <a v-if="isLoggedIn" @click="logout" class="get-started">Cerrar Sesión</a>
      <a v-else href="/login" class="get-started">Login</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()


const links = ref([
  { label: 'Home', icon: 'i-heroicons-home', to: '/' },
  { label: 'App', icon: 'i-heroicons-chart-bar', to: '/app' },
  { label: 'Pricing', icon: 'i-heroicons-currency-dollar', to: '/' },
  { label: 'Resources', icon: 'i-heroicons-book-open', to: '/' },
  { label: 'Company', icon: 'i-heroicons-office-building', to: '/' }
])

const isActive = (to) => router.currentRoute.value.path === to

const isLoggedIn = ref(false)

watchEffect(() => {
  if (process.client) {
    isLoggedIn.value = localStorage.getItem('loginToken') !== null
  }
})

const logout = () => {
  if (process.client) {
    localStorage.removeItem('loginToken')
    router.push('/')
    isLoggedIn.value = false
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #000;
  padding: 20px; /* Ajusta este valor para cambiar el padding vertical y horizontal */
  height: 120px; /* Ajusta este valor para cambiar la altura de la barra de navegación */
}

.navbar-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.logo {
  justify-content: flex-start;
  margin-left: 100px;
}

.auth-buttons {
  justify-content: flex-end;
  margin-right: 100px;
  z-index: 10; /* Asegúrate de que el z-index esté por encima de otros elementos */
}

.nav-items ul {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 0 30px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  display: flex;
  align-items: center;
}

.nav-link.active {
  border-bottom: 4px solid #50f00c;
}

.nav-icon {
  margin-right: 5px;
}

.auth-buttons a {
  color: #fff;
  text-decoration: none;
  font-size: 24px;
  padding: 10px 30px;
  margin-left: 10px;
}

.auth-buttons .get-started {
  background-color: #50f00c;
  color: #000;
  border-radius: 5px;
}

.nav-link, .auth-buttons a {
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.nav-link:hover, .auth-buttons a:hover {
  color: #50f00c;
  transform: scale(1.1);
}

.auth-buttons .get-started:hover {
  color: #000; /* Esto mantendrá el color del texto del botón "Get Started" en negro */
}

.logo {
  color: #50f00c; /* Establece el color inicial del logo a verde neón */
  animation: scan 10s steps(1, end) infinite;
}
</style>

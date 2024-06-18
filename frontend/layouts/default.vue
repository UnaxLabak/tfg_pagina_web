<template>
  <div class="layout">
    <Navbar />
    <div class="main-wrapper">
      <aside class="sidebar"></aside>
      <main class="content">
        <NuxtPage />
      </main>
      <aside class="sidebar"></aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-wrapper {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 10%; /* Ajusta este valor para el ancho deseado de los márgenes laterales */
}

.content {
  flex: 1;
  padding: 20px;
}

main {
  flex: 1;
}
</style>

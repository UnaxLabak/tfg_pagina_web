<template>
  <div class="layout">
    <Navbar />
    <main class="content">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';

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

.content {
  flex: 1;
  padding: 20px;
}

main {
  flex: 1;
}
</style>

<template>
    <div>
      <Navbar />
      <div class="content">
        <slot></slot>
      </div>
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
  .content {
    margin: 20px;
  }
  </style>
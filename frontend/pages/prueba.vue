<template>
  <Layout>
    <main>
      <h1>Welcome to My Nuxt Project</h1>
      <nuxt-button color="primary" size="large">Get Started</nuxt-button>
    </main>

    <nuxt-card>
      <h3>Card Title</h3>
      <p>This is some card content.</p>
    </nuxt-card>
  </Layout>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';


export default {
  components: {
    Navbar,
    Footer,
    Layout
  }
}
</script>

<style>
.container {
  text-align: center;
  padding: 2rem;
}
</style>
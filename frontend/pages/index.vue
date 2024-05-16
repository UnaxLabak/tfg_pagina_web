<template>
  <div>
    <Boton :buttonText="'Click me!'" @click="handleButtonClick"></Boton>
  </div>
</template>

<script>
import Boton from '~/components/Boton.vue'

export default {
  components: {
    Boton
  },
  methods: {
    handleButtonClick() {
      console.log('Button was clicked!');
    }
  }
}
</script>

<style scoped>
/* Add your CSS here */
</style>
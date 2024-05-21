<template>
  <Layout>
    <Boton @click="handleButtonClick" buttonText="Submit" />
    <!-- Add more content as needed -->
  </Layout>
</template>

<script>
import Boton from '@/components/Boton.vue';
import Layout from '@/components/Layout.vue';

const baseURL = 'http://localhost:8000';

export default {
  components: {
    Boton,
    Layout
  },
  methods: {
    async handleButtonClick() {
      try {
        const userData = {
          username: 'Mosimosi',
          password: 'password123'
        };

        const response = await fetch(baseURL + '/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 400 && data.error) {
            console.log(data.error)
          } else {
            throw new Error('HTTP error ' + response.status);
          }
        }else{
          console.log('User was created successfully:', data);
        }
      } catch (error) {
        console.error('An error occurred while creating the user:', error);
      }
    }
  }
}
</script>
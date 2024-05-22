<template>
  <div>
    <Boton @click="handleButtonClick" buttonText="Submit" />
    <!-- Add more content as needed -->
  </div>
</template>

<script>
import Boton from '@/components/Boton.vue';

const baseURL = 'http://localhost:8000';

export default {
  layout: 'default',
  components: {
    Boton
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
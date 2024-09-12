<template>
  <button class="button" @click="handleClick" :data-text="buttonText">{{ buttonText }}</button>
</template>

  <script>
  export default {
    props: {
      buttonText: {
        type: String,
        default: 'Click me'
      }
    }
  }
  </script>
  
  <style scoped>
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
}

.button:hover {
    background-color: #50f00c; /* Green background on hover */
    color: #000000; /* Black text on hover */
}


</style>
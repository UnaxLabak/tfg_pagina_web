<template>
    <button class= "button" @click="handleClick">{{ buttonText }}</button>
  </template>
  
  <script>
  export default {
    props: {
      buttonText: {
        type: String,
        default: 'Click me'
      }
    },
    methods: {
      handleClick() {
        this.$emit('click');
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
        color: rgb(0, 0, 0);
        background-color: rgb(255, 255, 255);
        border-radius: .375rem;
        padding: 1rem 2rem;
        text-decoration: none;
        transition: background-color .3s ease;
    }

    .button:hover {
    background-color: #00DC82;
    color: rgb(255, 255, 255);
    }

    @media (prefers-color-scheme: dark) {
        .button {
            color: rgb(255, 255, 255);
            background-color: rgb(0, 0, 0);
        }

        .button:hover {
            background-color: #0047E1;
        }
    
  }
  </style>
<template>
  <footer class="footer">
    <div class="footer-content">
      <a href="#" class="footer-item">About Us</a>
      <a href="#" class="footer-item">Contact</a>
      <a href="#" class="footer-item">Privacy Policy</a>
      <a href="#" class="footer-item">Terms of Service</a>
    </div>
    <div class="footer-copy">
      © 2024 Your Company. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #000;
  color: #fff;
  padding: 20px 40px;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.footer-item {
  margin: 0 20px;
  text-decoration: none;
  color: #fff;
  font-size: 18px;
}

.footer-copy {
  font-size: 16px;
}
</style>

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
  padding: 40px 60px; /* Tamaño del padding aumentado */
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
  font-size: 20px; /* Tamaño de la tipografía aumentado */
  position: relative;
}

.footer-item::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #50f00c; /* Color de la línea verde */
  transition: width 0.3s;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}

.footer-item:hover::after {
  width: 100%;
}

.footer-copy {
  font-size: 18px;
}
</style>

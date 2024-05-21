<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
        </div>
        <div class="footer-links">
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div class="footer-social">

        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
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
    background-color: #1c1c1e;
    color: #ffffff;
    padding: 2rem 0;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 2rem;
  }
  
  .footer-logo img {
    height: 40px;
  }
  
  .footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }
  
  .footer-links li {
    margin: 0 1rem;
  }
  
  .footer-links a {
    color: #ffffff;
    text-decoration: none;
  }
  
  .footer-social a {
    margin: 0 0.5rem;
  }
  
  .footer-social img {
    height: 24px;
  }
  
  .footer-bottom {
    text-align: center;
    padding: 1rem 0;
    border-top: 1px solid #333333;
    margin-top: 1rem;
  }
  </style>
  
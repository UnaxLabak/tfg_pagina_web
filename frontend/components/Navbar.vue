<template>
    <nav class="navbar">
      <div class="navbar-logo">
        
      </div>
      <ul class="navbar-links">
        <li><a href="#">Products</a></li>
        <li><a href="#">Solutions</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Resources</a></li>
        <li><a href="#">Company</a></li>
      </ul>
      <div class="navbar-actions">
        <a href="#" class="sign-in">Sign In</a>
        <a href="#" class="get-started">Get Started</a>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0a0a0a; /* Dark background */
    padding: 1rem 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .navbar-logo img {
    height: 40px;
  }
  
  .navbar-links {
    display: flex;
    list-style: none;
    gap: 1.5rem;
  }
  
  .navbar-links li a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .navbar-links li a:hover {
    color: #50f00c; /* Glowing green on hover */
  }
  
  .navbar-actions {
    display: flex;
    gap: 1rem;
  }
  
  .navbar-actions .sign-in {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .navbar-actions .sign-in:hover {
    color: #50f00c; /* Glowing green on hover */
  }
  
  .navbar-actions .get-started {
    background-color: #50f00c;
    color: #0a0a0a;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .navbar-actions .get-started:hover {
    background-color: #39b209; /* Darker green on hover */
    color: #ffffff;
  }
  </style>
  
<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="logo">

      </div>
      <div class="nav-items">
        <a href="#" class="nav-item">Products</a>
        <a href="#" class="nav-item">Solutions</a>
        <a href="#" class="nav-item">Pricing</a>
        <a href="#" class="nav-item">Resources</a>
        <a href="#" class="nav-item">Company</a>
      </div>
      <div class="auth-buttons">
        <a href="#" class="sign-in">Sign In</a>
        <a href="#" class="get-started">Get Started</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  background-color: #000;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo img {
  height: 40px;
}

.nav-items {
  display: flex;
  flex: 1;
  justify-content: center;
}

.nav-item {
  color: #fff;
  margin: 0 15px;
  text-decoration: none;
  font-size: 18px;
}

.auth-buttons .sign-in {
  color: #fff;
  margin-right: 10px;
  font-size: 18px;
}

.auth-buttons .get-started {
  background-color: #50f00c;
  color: #000;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 18px;
}
</style>

<script setup lang="ts">
import { useSession } from '../store/useSession';
const session = useSession();
</script>

<template>
  <div class="container">
    <p class="brand">Todo List Management</p>
    <div class="nav-links">
      <template v-if="session.isLogin">
        <RouterLink to="/list" class="nav-link">Lists</RouterLink>
        <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
        <RouterLink to="/logout" class="nav-link">Logout</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
        <RouterLink to="/register" class="nav-link">Register</RouterLink>
      </template>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 32px;
  background-color: #5074fc;
  color: white;
  font-family: 'Outfit', sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.brand {
  font-size: 1.25rem;
  font-weight: 600;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding-bottom: 2px;
  transition: border-bottom 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  color: #f4f4f4;
  border-bottom: 2px solid white;
}

.router-link-exact-active {
  border-bottom: 2px solid #f4f4f4;
}

.nav-item {
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.nav-item:hover {
  opacity: 0.8;
}
</style>

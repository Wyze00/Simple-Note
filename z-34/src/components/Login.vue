<script setup lang="ts">
import { ref } from "vue";
import { useSession } from "../store/useSession";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const session = useSession();

const router = useRouter();

const loginHandler = async () => {

  error.value = "";

  if(password.value.length < 8){
    error.value = "Password minimal 8 karakter";
    return;
  }

  try {

    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json();

    if(data.errors){
      throw new Error(data.errors);
    }

    const token = data.data.token;

    session.setLogin(token);

    router.push({
      path: '/profile'
    })

  } catch(e: any) {
    error.value = e.message;
  }

  
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="loginHandler">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  background-color: #ffffff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #5074fc; 
  border-radius: 8px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3e5fd9;
}

.error {
  color: red;
  font-weight: bold;
}
</style>

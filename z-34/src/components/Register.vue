<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const router = useRouter();

const registerHandler = async () => {

  error.value = "";

  if(password.value.length < 8 || confirmPassword.value.length < 8){
    error.value = "Password minimal 8 karakter";
    return;
  }

  if(password.value !== confirmPassword.value){
    error.value = "Password Tidak Sama";
    return;
  }

  try {

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        name: name.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json();

    if(data.errors){
      throw new Error(data.errors);
    }

    router.push({
      path: '/login'
    })

  } catch(e: any) {
    error.value = e.message;
  }
}

</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="registerHandler">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>

        <div class="form-group">
          <label for="username">Name</label>
          <input type="text" id="Name" v-model="name" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>

        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

.register-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
}

.register-container {
  background-color: #ffffff;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  font-family: 'Outfit', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #000000;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
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
  border: none;
}

button:hover {
  background-color: #3e5fd9;
}
</style>

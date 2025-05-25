<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSession } from '../store/useSession';

const data = ref({
  name: '',
});
const newPassword = ref("");
const newName = ref("");

const router = useRouter();
const session = useSession();

const passwordHandler = async () => {
  
  try {

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'PATCH',
      headers: {
        "X-API-TOKEN": session.getToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: newPassword
      })
    })

    const user = await response.json();

    if(user.errors){
      throw new Error("User salah");
    }

    data.value.name = user.data.name;

  } catch(e: any) {

    router.push({
      path: '/login'
    })
  }

}

const nameHandler = async () => {
  try {

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'PATCH',
      headers: {
        "X-API-TOKEN": session.getToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName
      })
    })
    
    const user = await response.json();
    
    if(user.errors){
      throw new Error("User salah");
    }
    
    data.value.name = user.data.name;
    
  } catch(e: any) {
    

  }
    
}

const deleteHandler = () => {
    
}

onMounted(async () => {
    
  try {

    const response = await fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        "X-API-TOKEN": session.getToken()
      }
    })

    const user = await response.json();

    if(user.errors){
      throw new Error(user.errors);
    }

    data.value = user.data;

  } catch(e: any) {

    router.push({
      path: '/login'
    })
  }
})

</script>

<template>
  <div class="profile-page">
    <div class="profile-container">
      <h1>Profile</h1>

      <div class="section">
        <h2>Update Name</h2>
        <input v-model="newName" type="text" :placeholder="data.name" />
        <button @click="nameHandler">Update Name</button>
      </div>

      <div class="section">
        <h2>Update Password</h2>
        <input v-model="newPassword" type="password" placeholder="New password..." />
        <button @click="passwordHandler">Update Password</button>
      </div>

      <div class="section danger">
        <h2>Danger Zone</h2>
        <button class="delete-button" @click="deleteHandler">Delete Account</button>
        <button class="delete-button" @click="deleteHandler">Logout</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-container {
  background-color: white;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  font-family: 'Outfit', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #000000;
}

h2 {
  margin-bottom: 0.5rem;
  color: #333;
}

.section {
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
}

button {
  /* width: 30%; */
  padding: 0.75rem;
  background-color: #5074fc;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3b5ed8;
}

.danger h2 {
  color: #b00020;
}

.delete-button {
  background-color: #ff4d4f;
  margin-right: 20px;
}

.delete-button:hover {
  background-color: #d9363e;
}
</style>    
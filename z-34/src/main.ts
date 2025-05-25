import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia';
import LandingPage from './components/LandingPage.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import { useSession } from './store/useSession';
import Profile from './components/Profile.vue';
import List from './components/List.vue';

const router = createRouter({
    routes: [
        {
            path: '/',
            component: LandingPage
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            component: Profile
        },
        {
            path: '/logout',
            component: LandingPage,
        },
        {
            path: '/list',
            children: [
              {
                path: '',
                component: List
              },
              {
                path: '/:id',
                component: List
              },
              {
                path: '/:id/update',
                component: List
              }
            ]
        }
    ],
    history: createWebHistory()    
});

const pinia = createPinia();

router.beforeEach((to, from, next) => {

  const session = useSession();

  const hasToken = session.checkLogin();

  if (hasToken){
    session.trueLogin();    
  } else { 
    session.falseLogin();
  }

  if (to.path === '/login' || to.path === '/register') {

    if (hasToken) {
      next('/profile'); 
    } else {
      next(); 
    }

  } else if (to.path === '/') {
    next(); 
  } else if(to.path === '/logout') {
    session.falseLogin();
    next('/login');
  } else {

    if (!hasToken) {
      next('/login'); 
    } else {
      next();
    }
  }
});

createApp(App).use(pinia).use(router).mount('#app')

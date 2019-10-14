import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index.vue'

import Films from './views/home/films.vue'
import Cinemas from './views/home/cinemas.vue'
import Center from './views/home/center.vue'

import Login from './views/login/index.vue'
import City from './views/city/index.vue'
import Film from './views/film/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'films',
          component: Films
        },
        {
          path: 'cinemas',
          component: Cinemas
        },
        {
          path: 'center',
          component: Center
        },
        {
          path: '',
          redirect: '/films'
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/city',
      component: City
    },
    {
      path: './film/:id',
      component: Film
    }
  ]
})

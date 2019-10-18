import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index.vue'

import Films from './views/home/films.vue'
import Cinemas from './views/home/cinemas.vue'
import Center from './views/home/center.vue'

import Login from './views/login/index.vue'
import City from './views/city/index.vue'
import Film from './views/film/index.vue'
import Particulars from './views/particulars/index.vue'
import CinmeasDetails from './views/cinmasdetails/index.vue'

Vue.use(Router)

const router = new Router({
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
          component: Center,
          meta: {
            needLogin: true
          }
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
      path: '/film/:id',
      component: Film
    },
    {
      path: '/particulars/:id',
      component: Particulars
    },
    {
      path: '/cinemas/:id',
      component: CinmeasDetails
    }
  ]
})

router.beforeEach((to, from, next) => {
  let userinfo = window.localStorage.getItem('userinfo')
  if (to.meta.needLogin && !userinfo) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})
export default router

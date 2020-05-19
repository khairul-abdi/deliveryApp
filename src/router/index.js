import Vue from 'vue'
import VueRouter from 'vue-router'
import Delivery from '../views/Delivery.vue'
import Payment from '../views/Payment.vue'
import Finish from '../views/Finish.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Delivery',
    component: Delivery
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/finish',
    name: 'Finish',
    component: Finish
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

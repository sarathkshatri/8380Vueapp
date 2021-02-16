import Vue from 'vue'
import Router from 'vue-router'

import authRoutes from './auth'
import recipeRoutes from './recipes'

Vue.use(Router)

const ROUTES = [
	{ path: '', redirect: '/home'}
]
	.concat(authRoutes)
  .concat(recipeRoutes)

const router = new Router({
	base: '/',
	mode: 'history',
	routes: ROUTES
})

router.beforeEach((to, from, next) => {
	document.body.classList.add('app-loading')

	const publicPages = ['/login', '/register', '/home']
	const authRequired = !publicPages.includes(to.path)
	const loggedIn = localStorage.getItem('jwtToken')

	if (authRequired && !loggedIn) {
		next('/login')
	} else {
		next()
	}

	setTimeout(() => next(), 100)
})

export default router

import LayoutAuth from '../layout/layoutAuth'

export default [{
	path: '/',
	component: LayoutAuth,
	children: [{
		path: 'login',
		component: () => import('@/views/auth/AuthLogin')
	}, {
    path: 'register',
    component: () => import('@/views/auth/AuthRegister')
  }]
}]

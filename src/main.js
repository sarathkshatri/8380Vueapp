import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './bootstrap-4.5.2-dist/css/bootstrap.min.css'

import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'

import globals from './globals'

import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use (IconsPlugin)

Vue.mixin({
  data: globals
})

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')

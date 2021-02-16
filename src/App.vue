<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import logoutMixin from "@/mixins/logoutMixin";

export default {
    name: 'App',
    mixins: [logoutMixin],
    metaInfo: {
      title: 'Index',
      titleTemplate: '%s - Vue Starter'
    },
    data: () => ({
          logo: require('@/assets/images/TastyRecipe.jpg')
        }),
    updated () {
      setTimeout(() => document.body.classList.remove('app-loading'), 1)
    },
    created () {
        axios.interceptors.response.use(response => {
            return response
        }), error => {
            if (error.response.status === 401 || error.response.status === 403) {
                this.logOut()
            }
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2e2425;
  margin-top: 0px;
 
}
 

</style>

<template>
  <div class="bg"> 
    <div class="card text-dark d-inline-flex p-1 justify-content-center" style="width: 25rem;">
        <div class="card-header" style="background-color:lightcoral">
          Login
        </div>
        <div class="card-body">
          
                  <form name="form" @submit.prevent="handleLogin">
                    <b-form-group label="username">
                      <div slot="label" class="d-flex justify-content-between align-items-end">
                        <div>username</div>
                      </div>
                      <b-input v-model="user.username" />
                    </b-form-group>
                    <b-form-group>
                      <div slot="label" class="d-flex justify-content-between align-items-end">
                        <div>password</div>
                      </div>
                      <b-input type="password" v-model="user.password" />
                    </b-form-group>
                    
                      <button class="btn btn-primary" :disabled="loading">
                        Login
                      </button>
                    
                  </form>
                </div>
    </div>
  </div> 

</template>

<script>
import User from '../../models/user'

export default {
  name: 'auth-login',
	data () {
      return {
            user: new User('', '', '', '', '', ''),
			loading: false,
			message: '',
		}
	},
    computed: {
      loggedIn () {
          return this.$store.state.auth.status.loggedIn
      }
    },
    created () {
      if (this.loggedIn) {
          this.$router.push('/recipes')
      }
    },
    methods: {
      handleLogin () {
          this.loading = true
          if (this.user.username && this.user.password) {
              this.$store.dispatch('auth/login', this.user).then(
                  () => {
                      this.$router.push('/')
                  },
                  () => {
                      this.loading = false
                      this.message = 'wrong credentials'
                  }
              )
          }
      }
    },
    mounted () {
        this.layoutHelpers.init()
        this.layoutHelpers.update()
        this.layoutHelpers.setAutoUpdate(true)
    },
    beforeDestroy () {
        this.layoutHelpers.destroy()
    }
}
</script>

<style scoped>
body, html {
    height: 100%;
  }

.bg {
    /* The image used */
    
    background-image: url("../../assets/images/login.jpg");
    min-height: 800px;

    /* Half height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

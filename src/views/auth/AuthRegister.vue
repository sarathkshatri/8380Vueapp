<template>
<div class="bg">
 <div class="card text-dark d-inline-flex p-1 flex-column justify-content-center" style="width:30rem">
  <div class="card-header" style="background-color:lightcoral">
    Sign Up
  </div>
  <div class="card-body">

    <div class="vue-template authentication-wrapper authentication-3">
    <div class="authentication-inner">

      </div>

          <div class="w-100">
            <form name="form" @submit.prevent="handleRegister">
              <b-form-group label="username">
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>Username:</div>
                </div>
                <b-input v-model="user.username" />
              </b-form-group>
              <b-form-group label="first name">
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>First name:</div>
                </div>
                <b-input v-model="user.firstname" />
              </b-form-group>
              <b-form-group label="last name">
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>Last name:</div>
                </div>
                <b-input v-model="user.lastname" />
              </b-form-group>
              <b-form-group label="email">
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>Email:</div>
                </div>
                <b-input v-model="user.email" />
              </b-form-group>
              <b-form-group>
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>Password:</div>
                </div>
                <b-input type="password" v-model="user.password" />
              </b-form-group>
              <b-form-group>
                <div slot="label" class="d-flex justify-content-between align-items-end">
                  <div>Password confirmation:</div>
                </div>
                <b-input type="password" v-model="user.password_confirm" />
              </b-form-group>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                Register
              </button>
          </form>

          </div>


    </div>
    </div>
    <b-modal id="error-modal" hide-body hide-footer>
      <template v-slot:modal-title>
        Errors occurred while registering a new account.
      </template>
      <div v-for="errorMessage in errorMessages" :key="errorMessage[0]">
        <b-alert show variant="danger">{{ errorMessage[0] }}</b-alert>
      </div>
    </b-modal>
  </div>
</div>
</template>

<script>
    import User from '../../models/user'

    export default {
        name: 'auth-register',
        data () {
            return {
                user: new User('', '', '', '', '', ''),
                loading: false,
                message: '',
                errorMessages: []
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
            handleRegister () {
                this.loading = true
                if (this.user.username && this.user.password && this.user.password_confirm && this.user.firstname && this.user.lastname && this.user.email) {
                    this.$store.dispatch('auth/register', this.user).then(
                        (response) => {
                            if (response.status == 201) {
                                this.$router.push('/login')
                            } else if (response.status == 400) {
                                this.errorMessages = response.data
                                this.$bvModal.show('error-modal')
                            }
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
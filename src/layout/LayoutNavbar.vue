<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/home">TastyRecipes</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav >
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" style="color">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em v-if="loggedIn">{{ username }}</em>
              <em v-else>Anonymous</em>
            </template>
            <!-- Using 'button-content' slot -->
            <div v-if="loggedIn">
              <b-dropdown-item v-on:click="logOut">Sign Out</b-dropdown-item>
            </div>
            <div v-else>
              <b-dropdown-item href="/login">Sign in</b-dropdown-item>
              <b-dropdown-item href="/register">Register</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
<!--      <mdb-parallax-->
<!--      src="https://mdbootstrap.com/img/Photos/Others/img%20%2848%29.jpg"-->
<!--      height="full"-->
<!--      factor="2">-->
<!--      <mdb-mask overlay="black-light" color="#78909c" class="d-flex justify-content-center align-items-center">-->
<!--      </mdb-mask>-->
<!--    </mdb-parallax>-->
  </div>
</template>


<script>
import logoutMixin from '../mixins/logoutMixin'

export default {
    name: 'app-layout-navbar',
    mixins: [logoutMixin],
    data () {
        return {
            // loggedIn: false
        }
    },
    created () {
        // this.loggedIn = this.$store.state.auth.status.loggedIn
    },
    computed: {
        loggedIn () {
            return this.$store.state.auth.status.loggedIn
        },
        username () {
            return localStorage.getItem("userName")
        }
    }
}
</script>
<style>
.ml-auto{
  
  color: #ad4851;
  
 
}
</style>

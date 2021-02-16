<template>
	<div class="bg">
    <div class="layout-wrapper layout-2">
    <div class="layout-inner">
      <div class="layout-container">
        <div>
          <b-navbar toggleable="lg" primary="red" type="dark" variant="info">
            <b-navbar-brand href="/home">TastyRecipes</b-navbar-brand>
          </b-navbar>
        </div>
        <div class="layout-content">
          <div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
	</div>
</div>
</template>

<script>
    export default {
        name: 'app-layout-auth',
        mounted () {
            this.layoutHelpers.init()
            this.layoutHelpers.update()
            this.layoutHelpers.setAutoUpdate(true)
        },

        beforeDestroy () {
            this.layoutHelpers.destroy()
        },

        methods: {
            closeSidenav () {
                this.layoutHelpers.setCollapsed(true)
            }
        }
    }
</script>
<style scoped>
body, html {
    height: 100%;
  }
.bg {
    /* The image used */
    
    background-image: url("../assets/images/login.jpg");

    /* Half height */
    min-height: 800px;
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

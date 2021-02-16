<template>
  <div class="bg">
    <div class="layout-wrapper layout-2">
    <div class="layout-inner">

      <div class="layout-container"> 
        <app-layout-navbar/>
            <router-view />
          
      </div>
    </div>
    <div class="layout-overlay" @click="closeSidenav"></div>
  </div>
  </div>
</template>

<script>
import LayoutNavbar from "@/layout/LayoutNavbar";

export default {
    name: 'app-layout',
    components: {
        'app-layout-navbar': LayoutNavbar,
    },

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
    
    background-image: url("../assets/images/img.jpg");

    /* Half height */
    min-height: 800px;
    height: auto;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

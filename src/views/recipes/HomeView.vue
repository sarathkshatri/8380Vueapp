<template>
  <div class="class">
    <h1></h1>

    <h2>Tasty Recipe</h2>
      <p>To live a full life, you have to fill your stomach first.</p>  
    <div>
      <category-component/>
    </div>
  </div>
</template>

import image from "./assets/logo.png"
<script>
import Category from "../../components/Category"
    export default {
        name: 'home-view',
        components: {
          'category-component': Category
        },
        data: () => ({
          
        })
        
    }
</script>
<style scoped>
.h2{

  margin-top: 100px;
}
.class{

  margin-top:10px;
}

</style>

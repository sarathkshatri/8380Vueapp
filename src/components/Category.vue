<template>
  <div class="category">
    <div>
        <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
        <b-button variant="btn btn-link" @click="loadFavorites" style="color:#ad4851; font-size: 35px">Favorite List</b-button>
    </div>
      <br>
      <h2>Category Lists</h2>
      <br>
    <div class="card" style="width: 18rem;margin-left: auto;margin-right: auto;">
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="item in categories" v-bind:key="item.pk">
        <button type="button" class="btn btn-link" @click="loadRecipes(item.pk)" style="color:black">{{item.category_name}}</button></li>
  </ul>
</div>
  <br>
  </div>
</template>

<script>
import RecipeAPIService from '../services/recipeAPI.service'
export default {
  name: 'categorieslist',
  data () {
      return {
          categories: []
      }
  },
  created () {
      this.getCategoriesList();
  },
  methods: {
    async getCategoriesList() {
        this.loading = true
        const response = await RecipeAPIService.getCategories()
        this.categories = response.data.data;
        this.loading = false
    },
      loadRecipes (categoryID) {
        this.$router.push('/recipes/' + categoryID)
      },
      loadFavorites(){
        this.$router.push('/favorites/')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  color:#ad4851;
}
ul {
  list-style-type: none;
  padding: 0;
  background-color:#d5ec82;
}

li {
  display: inline-block;
  margin: 0 10px;
  background-color:#d5ec82;
  
}
a {
  color: #42b983;
}
li:hover {background-color:#cf967f}
.category{
margin-top: 10rem;


}
</style>

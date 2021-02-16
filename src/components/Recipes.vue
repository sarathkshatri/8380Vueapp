<template>
   <div>
    <div>
      <b-alert v-model="showErrorMessage" variant="danger" dismissible>
        {{ this.errorMessage }}
      </b-alert>
      <div class="row">
        <table class="table table-hover table-bordered table-striped" style="display: inline-table; height:auto; margin:5rem; width:95%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Instructions</th>
                     <th>UserName</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody v-for="recipe in recipes" v-bind:key="recipe.pk">
              <tr>
                  <td>
                      {{recipe.recipe_name}}
                  </td>
                  <td>
                      {{recipe.instructions}}
                  </td>
                  <td>
                      {{recipe.username}}
                  </td>
                  <td>
                    <button class="btn" @click="loadComments(recipe.pk)" style = "font-size: 20px;color:#66CDAA"><i class="glyphicon glyphicon-comment"></i></button>
                    <button class="btn btn-secondary" @click="loadIngredients(recipe.pk)" style="font-size: 12.5px">Ingredients</button>
                    <button class="btn" @click="newFavorite(recipe.pk)" style="font-size: 20px;color:#DC143C"><i class="glyphicon glyphicon-heart"></i></button>
                    <button v-if="recipe.username == loggedInUser" class="btn" @click="editRecipe(recipe.pk)" style="font-size: 20px;color:#8B008B"><i class="glyphicon glyphicon-pencil"></i></button>
                    <button v-if="recipe.username == loggedInUser" class="btn" @click="deleteRecipe(recipe.pk)" style="font-size:20px;color:#FF4500"><i class="glyphicon glyphicon-trash"></i></button>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" style="left; padding-left: 10%;">
        <link rel= "stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
      <button class="btn " @click="addRecipe" style="font-size: 50px; color:#191970"><i class="glyphicon glyphicon-plus">AddRecipe</i></button>
    </div>
  </div>
</template>

<script>
import RecipeAPIService from '../services/recipeAPI.service'

export default {
    name: 'recipes',
    data () {
        return {
            categoryID: '',
            recipes: [],
            errorMessage: '',
            showErrorMessage: false,
        }
    },
    created () {
        this.categoryID = this.$route.params.categoryID
        this.recipeID = this.$route.params.recipeID
        this.username = localStorage.getItem("userName")
         this.loggedInUser = localStorage.getItem("userName")
        this.loadRecipes()
        // this.loadFavorites ()
    },
    methods: {
        async loadRecipes () {
            this.loading = true
            const response = await RecipeAPIService.getRecipes(this.categoryID)
            this.recipes = response.data.data;
            this.loading = false
        },
        loadComments (RecipeID) {
            this.$router.push('/recipes/' + RecipeID + '/comment')
        },
        loadIngredients (RecipeID){
            this.$router.push('/recipes/' + RecipeID + '/ingredients')
        },
        addRecipe() {
            this.$router.push('/recipes/' + this.categoryID + '/recipe')
        },
        editRecipe (recipeID) {
            this.$router.push('/recipes/' + this.categoryID + '/update/' + recipeID)
        },
        async deleteRecipe (recipeID) {
            this.loading = true
            await RecipeAPIService.deleteRecipe(recipeID)
            this.loading = false
            this.loadRecipes()
        },
        async newFavorite(recipeID) {
            this.loading = true
            const response = await RecipeAPIService.postFavorites(this.username, recipeID)
            this.loading = false
            if (response.data.message === "Favourite Created succesfully") {
                this.$router.push('/favorites/')
            } else if (response.data.message == "Already added in your favourites") {
                this.errorMessage = response.data.message
                this.showErrorMessage = true
            }
        },
        // async loadFavorites(){
        //   this.loading = true
        //   await RecipeAPIService.postFavorites(this.username, this.recipeID)
        //   this.loading = false
        //   this.loadRecipes()
        // }
    }
}
</script>
<style scoped>
th {
    background-color:rgb(97, 92, 121);
    color: white;
}
table {
background-color: white;
text-align: left;
}
.row{
    align-items: center;
}

</style>

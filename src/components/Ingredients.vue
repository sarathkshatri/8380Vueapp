<template>
  <div>
  <div class="card mx-auto text-center text-dark d-inline-flex p-1 justify-content-center">
        <div class="card-header">
           Ingredients List
        </div>
        <div class="card-body">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Substance Name</th>
                <th>Amount</th>
                <th>Unit</th>
                <th  v-if="loggedInUser == recipe.username" colspan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
               <tr  v-for="ingredient in ingredients" v-bind:key="ingredient.pk">
                  <td>{{ingredient.substance_name}}</td>
                  <td>{{ingredient.amount}}</td>
                  <td>{{ingredient.unit}}</td>
                  <td  v-if="loggedInUser == recipe.username">
                      
                      <button class="btn" @click="editIngredient(ingredient.pk)" style="font-size: 20px;color:#8B008B"><i class="glyphicon glyphicon-pencil"></i></button>
                      <button class="btn" @click="deleteIngredient(ingredient.pk)" style="font-size: 20px;color:#FF4500"><i class="glyphicon glyphicon-trash"></i></button>
                      
                  </td>
               </tr>
            </tbody>
          </table>
        </div>
        <link rel= "stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
            <div  v-if="loggedInUser == recipe.username" class="row" style="left; padding-left: 10%;">
              <button class="btn btn-primary" @click="addIngredients">Add new Ingredients</button>
            </div>
        <br>
    </div>
  </div>
</template>

<script>
import RecipeAPIService from '../services/recipeAPI.service'

export default {
    name: 'ingredients',
    data () {
        return {
            recipeID: '',
            categoryID: '',
            recipe: '',
            ingredients: [],
            loggedInUser: '',
        }
    },
    created () {
        this.recipeID = this.$route.params.recipeID
        this.categoryID = this.$route.params.categoryID
        this.loggedInUser = localStorage.getItem("userName")
        this.loadIngredients()
        this.loadRecipe()
    },
    methods: {
        async loadRecipe () {
            this.loading = true
            await RecipeAPIService.getRecipe(this.recipeID).then(result => {
                this.recipe = result.data.data
            })
            // this.recipe = response.data
            this.loading = false
        },
        async loadIngredients () {
            this.loading = true
            const response = await RecipeAPIService.getIngredients(this.recipeID)
            this.ingredients = response.data.data;
            console.log()
            this.loading = false
        },
        addIngredients(){
            this.$router.push('/recipes/' + this.recipeID + '/addingredients')
        },
         editIngredient (ingredientID) {
            this.$router.push('/recipes/' + this.recipeID + '/ingredientupdate/' + ingredientID)
        },
        async deleteIngredient (ingredientID) {
            this.loading = true
            await RecipeAPIService.deleteIngredient(ingredientID)
            this.loading = false
            this.loadIngredients()
        }
    }
}
</script>

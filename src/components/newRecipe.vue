<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Recipe name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="getRecipeName"
          required
          placeholder="Enter recipe name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Instructions" label-for="input-2">
          <b-form-textarea
            id="input-2"
            v-model="getInstructions"
            required
            placeholder="Instructions"
            rows="2"
            max-rows="4"
          ></b-form-textarea>
      </b-form-group>


      <b-button v-if="recipeID == null" type="submit" variant="primary">Save recipe</b-button>
      <b-button v-else variant="primary" @click="updateRecipe">Update recipe</b-button>
      <b-button variant="danger" @click="cancelRecipeCreation">Cancel</b-button>
    </b-form>
  </div>
</template>
<script>
  import RecipeAPIService from '../services/recipeAPI.service'

  export default {
      data() {
          return {
              categoryID: '',
              recipeName: '',
              instructions: '',
              show: true,
              username: '',
              recipeID: ''
          }
      },
      created() {
          this.categoryID = this.$route.params.categoryID
          this.recipeID = this.$route.params.recipeID
          this.username = localStorage.getItem("userName")
          this.getRecipe()
      },
      computed: {
          getRecipeName: {
              get () {
                  return this.recipeName
              },
              set (newValue) {
                  this.recipeName = newValue
              }
          },
          getInstructions: {
              get () {
                  return this.instructions
              },
              set (newValue) {
                  this.instructions = newValue
              }
          }
      },
      methods: {
          async getRecipe() {
              if (this.recipeID !== null) {
                  this.loading = true
                  const response = await RecipeAPIService.getRecipe(this.recipeID)
                  this.recipeName = response.data.data.recipe_name
                  this.instructions = response.data.data.instructions
                  this.loading = false
              }
          },
          async onSubmit(evt) {
              evt.preventDefault()
              this.loading = true
              const response = await RecipeAPIService.addRecipe(this.categoryID, this.username, this.recipeName, this.instructions)
              this.recipe = response.data
              this.loading = false
              this.$router.push('/recipes/' + this.categoryID)
          },
          onReset(evt) {
              evt.preventDefault()
              // Reset our form values
              this.form.email = ''
              this.form.name = ''
              this.form.food = null
              this.form.checked = []
              // Trick to reset/clear native browser form validation state
              this.show = false
              this.$nextTick(() => {
                  this.show = true
              })
          },
          async updateRecipe () {
              this.loading = true
              await RecipeAPIService.putRecipe(this.recipeID, this.username, this.recipeName, this.instructions)
              this.loading = false
              this.$router.push('/recipes/' + this.categoryID)
          },
          cancelRecipeCreation () {
              this.$router.push('/recipes/' + this.categoryID)
          }
      }
  }
</script>

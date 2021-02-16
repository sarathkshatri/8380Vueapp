import axios from 'axios'
import authHeader from "./auth-header"

// const API_URL = "http://localhost:8000/api/v1/recipes/"
const API_URL = 'https://tastyrecipes-isqa.herokuapp.com/api/v1/recipes/'

class RecipeAPIService {
    getCategories () {
        return axios.get( API_URL + 'categories', { headers: authHeader() })
    }

    getRecipes (categoryID) {
        return axios.get(API_URL + categoryID + '/recipe', { headers: authHeader() })
    }

    addRecipe (categoryID, username, recipe_name, instructions) {
      return axios.post( API_URL + 'category/recipe/', { category: categoryID, username: username, recipe_name: recipe_name, instructions: instructions }, { headers: authHeader() })
    }

    addComment (recipeID, username, comment) {
        return axios.post( API_URL + 'comment/', { recipe: recipeID, username: username, comment: comment}, { headers: authHeader() })
    }

    addIngredient (recipeID, substance ) {
        return axios.post( API_URL + recipeID +'/ingredients/', {recipe: recipeID, substance: substance.substance, amount: substance.amount, unit: substance.unit },{ headers: authHeader() })
    }

    getComments (recipeID) {
        return axios.get(API_URL + recipeID + '/comment', { headers: authHeader() })
    }

    getIngredients (recipeID) {
        return axios.get(API_URL + recipeID + '/ingredients', { headers: authHeader() })
    }

    getRecipe (recipeID) {
      return axios.get(API_URL + recipeID, { headers: authHeader() })
    }

    putRecipe(recipeID, username, recipe_name, instructions) {
      return axios.put(API_URL + 'category/recipe/' + recipeID + '/', { username: username, recipe_name: recipe_name, instructions: instructions }, { headers: authHeader() })
    }

    deleteRecipe (recipeID) {
      return axios.delete(API_URL + 'category/recipe/' + recipeID + '/', { headers: authHeader() })
    }
    putComment(commentID, username, comment){
      return axios.put(API_URL + 'comment/' + commentID +'/', { username: username, comment: comment}, { headers: authHeader() })
    }
    getComment(commentID){
      return axios.get(API_URL +'recipe/comment/'+ commentID, { headers: authHeader() })
    }
    putIngredient (ingredientID, recipeID, substance){
      return axios.put(API_URL + 'ingredient/' + ingredientID + '/' , {recipe: recipeID, substance: substance.substance, amount: substance.amount, unit: substance.unit },{ headers: authHeader() })
    }
    deleteIngredient (ingredientID){
      return axios.delete(API_URL + 'ingredient/' + ingredientID + '/' ,{ headers: authHeader() })
    }
    deleteComment(commentID){
      return axios.delete(API_URL + 'comment/' + commentID +'/', { headers: authHeader() })
    }
    getFavorites(){
      return axios.get(API_URL +'favourites/list/', { headers: authHeader() })
    }
    deleteFavorites(favoriteID){
      return axios.delete(API_URL + favoriteID + "/favourite/delete/", { headers: authHeader()})
    }
    postFavorites(username, recipeID){
      return axios.post( API_URL + recipeID +'/favourites/create/', {username:username ,recipe: recipeID},{ headers: authHeader() })
    }
    getSubstances() {
      return axios.get(API_URL + 'substances/', { headers: authHeader() })
    }
    getIngredient(ingredientID) {
      return axios.get(API_URL + 'ingredient/' + ingredientID, { headers: authHeader() })
    }
}

export default new RecipeAPIService()

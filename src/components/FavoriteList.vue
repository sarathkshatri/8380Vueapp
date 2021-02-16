<template>
  <div class="hello" style= "margin:5rem">
    
      <h1>   </h1>
      
      <h4>Favorites</h4>
     <div class="row">
        <table class="table" style="display: inline-table; margin-left:center;margin-right: auto; margin:5rem; width:50%">
            <thead>
                <tr>
                    <th>Recipe Name</th>
                    <th colspan="2">Actions</th>

                </tr>
            </thead>
            <tbody v-for="favorite in favorites" v-bind:key="favorite.pk">
              <td>
               {{favorite.recipe_name}}
              </td>
              <td>
                  <button class="btn" @click="deleteFavorite(favorite.pk)" style="font-size: 20px;color:#FF4500"><i class="glyphicon glyphicon-trash"></i></button>
                  
              </td>
              <link rel= "stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
          </tbody>
        </table>
      </div>
    </div>
  
</template>


<script>
import RecipeAPIService from '../services/recipeAPI.service'
export default {
  name: 'Favorites',
  data () {
        return {
            favorites: [],

        }
    },
    created () {
         this.getFavoriteList();
    },
    methods: {
        async getFavoriteList() {
            this.loading = true
            const response = await RecipeAPIService.getFavorites()
            this.favorites = response.data.data;
            this.loading = false
        },
         async deleteFavorite(favoriteID){
            this.loading = true
            await RecipeAPIService.deleteFavorites(favoriteID)
            this.loading = false
            this.getFavoriteList()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#row {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
th {
    background-color:lightcoral;
    color: white;
    text-align: center;
    
}
table {
background-color: white;
}
.table{
  height: 200px;
  
  border: 3px solid green; 
}

</style>

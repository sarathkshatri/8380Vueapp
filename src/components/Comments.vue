<template>
  <div>

    <div class="card mx-auto text-center text-dark d-inline-flex p-1 justify-content-center">
        <div class="card-header">
          Comments
        </div>
        <div class="card-body">
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
                <th>UserName</th>
                <th>Comment</th>
                <th colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
               <tr  v-for="comment in comments" v-bind:key="comment">
                  <td>{{ comment.username }}</td>
                  <td>{{ comment.comment }}</td>
                  <td>
                    <div v-if="comment.username == loggedInUser">
                    <button class="btn" @click="editComment(comment.pk)" style="font-size: 20px;color:#8B008B"><i class="glyphicon glyphicon-pencil"></i></button>
                    
                    <button class="btn" @click="deleteComment(comment.pk)" style="font-size: 20px;color:#DC143C"><i class="glyphicon glyphicon-trash"></i></button>
                    </div>
                  </td>
               </tr>
            </tbody>

          </table>
        </div>
        <div class="card-footer text-muted">
          2 days ago
        </div>
        <link rel= "stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <div class="row" style="left; padding-left: 10%;">
          <button class="btn btn-primary" @click="addComment">Add new Comment</button>
        </div>
        <br>
    </div>



 </div>




</template>

<script>
import RecipeAPIService from '../services/recipeAPI.service'

export default {
    name: 'recipes',
    data () {
        return {
            recipeID: '',
            comments: [],
            loggedInUser: '',
        }
    },
    created () {
        this.recipeID = this.$route.params.recipeID
        this.loggedInUser = localStorage.getItem("userName")
        this.loadComments()
    },
    methods: {
        async loadComments () {
            this.loading = true
            const response = await RecipeAPIService.getComments(this.recipeID)
            this.comments = response.data.data;
            console.log()
            this.loading = false
        },
        addComment() {
            this.$router.push('/recipes/' + this.recipeID + '/addcomment')
        },
        editComment (commentID) {
            this.$router.push('/recipes/' + this.recipeID + '/edit/' + commentID)
        },
        async deleteComment(commentID){
          this.loading = true
            await RecipeAPIService.deleteComment(commentID)
            this.loading = false
            this.loadComments()
        }
    }
}
</script>

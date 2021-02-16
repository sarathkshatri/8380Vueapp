<template>
  <div>
      <h3>Add Comment </h3>
      <br>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-2" label="Comment" label-for="input-2">
          <b-form-textarea
            id="input-2"
            v-model="getComment"
            required
            placeholder="Add Comment"
            rows="2"
            
            max-rows="3"
          ></b-form-textarea>
      </b-form-group>


      <b-button v-if="commentID == null" type="submit" variant="primary">Save Comment</b-button>
      <b-button v-else variant="primary" @click="updateComment">Update Comment</b-button>
       <b-button variant="danger" @click="cancelRecipeCreation">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
import RecipeAPIService from '../services/recipeAPI.service'

export default {
  name: 'addComment',
  data () {
      return {
        username: '',
        show: true,
        recipeID: '',
        comment:'',
        commentID: ''
      }
  },
  created () {
      this.recipeID = this.$route.params.recipeID
      this.commentID = this.$route.params.commentID
      this.username = localStorage.getItem("userName")
      this.get1Comment()
  },
  computed: {
          getComment: {
              get () {
                  return this.comment
              },
              set (newValue) {
                  this.comment = newValue
              }
          }
          },
  methods: {
      async get1Comment() {
         if (this.commentID !== null) {
                  this.loading = true
                  const response = await RecipeAPIService.getComment(this.commentID)
                  this.comment = response.data.data.comment
                  this.loading = false
              }
      },
      async onSubmit(evt) {
         evt.preventDefault()
              this.loading = true
              await RecipeAPIService.addComment(this.recipeID, this.username, this.comment)
              // this.recipe = response.data.data;
              this.loading = false
              this.$router.push('/recipes/' + this.recipeID + '/comment')
      },
      async updateComment (){
        this.loading = true
        await RecipeAPIService.putComment(this.commentID, this.username, this.comment)
        this.loading = false
        this.$router.push('/recipes/' + this.recipeID + '/comment')
      },
      cancelRecipeCreation () {
              this.$router.push('/recipes/' + this.recipeID + '/comment')
          }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  width:10%;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

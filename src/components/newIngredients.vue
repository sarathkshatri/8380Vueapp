<template>
  <div>
      <h3>Add Ingredients for your Recipe </h3>
      <br>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Substance:"
        label-for="input-1"
      >
        <b-form-select
          v-model="selectedSubstance.substance"
          :options="substances"
          value-field="pk"
          text-field="substance_name"
        >
          <template v-slot:first>
            <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
          </template>
        </b-form-select>
<!--        <b-form-input-->
<!--          id="input-1"-->
<!--          v-model="substance"-->
<!--          required-->
<!--          placeholder="Enter substance id"-->
<!--        ></b-form-input>-->
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Amount:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="selectedSubstance.amount"
          required
          placeholder="Enter amount"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Unit:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="selectedSubstance.unit"
          required
          placeholder="Enter unit"
        ></b-form-input>
      </b-form-group>

      <b-button v-if="ingredientID == null" type="submit" variant="primary">Save ingredients</b-button>
      <b-button v-else variant="primary" @click="saveIngredient">Update ingredients</b-button>
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
          show: true,
          recipeID: '',
          substance: '',
          amount: '',
          unit: '',
          ingredientID:'',
          substanceList: [],
          selectedSubstance: [],
          ingredientToUpdate: null,
      }
  },
  created () {
      this.recipeID = this.$route.params.recipeID
      this.ingredientID = this.$route.params.ingredientID
      if (this.ingredientID != null) {
          this.loadIngredient()
      }
      this.loadSubstances()
  },
  computed: {
    getSubstance: {
        get () {
            return this.substance
        },
        set (newValue) {
            this.substance = newValue
        }
    },
    getAmount: {
        get () {
            return this.amount
        },
        set (newValue) {
            this.amount = newValue
        }
    },
    getUnit: {
        get () {
            return this.unit
        },
        set (newValue) {
            this.unit = newValue
        }
    },
      substances: {
        get () {
            return this.substanceList
        },
          set (newValue) {
            this.substanceList = newValue
          }
      }
  },
  methods: {
      async onSubmit(evt) {
         evt.preventDefault()
          this.loading = true
          console.log(this.selectedSubstance)
          await RecipeAPIService.addIngredient(this.recipeID, this.selectedSubstance)
          // this.recipe = response.data.data;
          this.loading = false
          this.$router.push('/recipes/' + this.recipeID + '/ingredients')
      },
      async saveIngredient () {
        this.loading = true
        await RecipeAPIService.putIngredient(this.ingredientID, this.recipeID, this.selectedSubstance)
        this.loading = false
        this.$router.push('/recipes/' + this.recipeID + '/ingredients')
      },
         cancelRecipeCreation () {
              this.$router.push('/recipes/' + this.recipeID + '/ingredients')
          },
        async loadSubstances() {
            await RecipeAPIService.getSubstances().then(result => {
                this.substances = result.data.data
            })
        },
      async loadIngredient() {
          await RecipeAPIService.getIngredient(this.ingredientID).then(result => {
            this.selectedSubstance = result.data.data
          })
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
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

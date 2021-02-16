import Layout from '@/layout/Layout'

export default [{
  path: '/',
  component: Layout,
  children: [{
    path: 'home',
    component: () => import('@/views/recipes/HomeView')
  // }, {
  //   path: 'recipes',
  //   component: () => import('@/views/recipes/RecipesView')
  }, {
    path: 'recipes/:categoryID',
    component: () => import('@/components/Recipes')
  },{
    path: 'recipes/:recipeID/ingredients',
    component: () => import('@/components/Ingredients')
  }, {
    path: 'recipes/:recipeID/comment',
    component: () => import('@/components/Comments')
  }, {
    path: 'recipes/:categoryID/recipe',
    component: () => import('@/components/newRecipe')
  }, {
    path: 'recipes/:recipeID/addcomment',
    component: () => import('@/components/newComment')
  }, {
    path: 'recipes/:recipeID/addingredients',
    component: () => import('@/components/newIngredients')
  }, {
    path: 'recipes/:categoryID/update/:recipeID',
    component: () => import('@/components/newRecipe')
  },{
    path: 'recipes/:recipeID/edit/:commentID',
    component: () => import('@/components/newComment')
  },{
    path: 'recipes/:recipeID/ingredientupdate/:ingredientID',
    component: () => import('@/components/newIngredients')
  },{
    path:'favorites/',
    component: () => import('@/components/FavoriteList')
  }]
}]

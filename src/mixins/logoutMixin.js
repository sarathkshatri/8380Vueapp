export default {
  methods: {
    logOut () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/home')
    }
  }
}

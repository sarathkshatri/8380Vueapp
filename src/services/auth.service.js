import axios from 'axios'

// const API_URL = "http://localhost:8000/api/v1"
const API_URL = 'https://tastyrecipes-isqa.herokuapp.com/api/v1'

class AuthService {
	login (user) {
    localStorage.setItem('userName', user.username)
		return axios
			.post(API_URL + '/auth/', {
				username: user.username,
				password: user.password
			})
			.then(response => {
				if (response.data.token) {
					localStorage.setItem('jwtToken', JSON.stringify(response.data))
				}

				return response.data
			})
	}

	logout() {
		localStorage.removeItem('userName')
    localStorage.removeItem('jwtToken')
	}

	register (user) {
    return axios
      .post(API_URL + '/accounts/register/', {
        username: user.username,
        first_name: user.firstname,
        last_name: user.lastname,
        email: user.email,
        password: user.password,
        password_confirm: user.password_confirm,
      })
      .then(response => {
        if (response.data) {
          //localStorage.setItem('user', JSON.stringify(response.data))
          // this.login(response.data)
        }
        return response
      })
      .catch(error => {
        return error.response
      })
  }
}

export default new AuthService()

export default function authHeader () {
	const jwtToken = JSON.parse(localStorage.getItem('jwtToken'))

	if (jwtToken && jwtToken.token) {
		return { Authorization: 'JWT ' + jwtToken.token }
	} else {
		return { }
	}
}

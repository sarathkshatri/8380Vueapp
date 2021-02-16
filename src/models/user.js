export default class User {
	constructor (username, password, password_confirm, firstname, lastname, email) {
		this.username = username
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
    this.password_confirm = password_confirm
	}
}

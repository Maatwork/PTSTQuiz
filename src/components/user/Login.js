import React, {Component} from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleLogin(event) {
        const settings = {
            method: "POST",
            headers: this.getHeaders(),
            body: this.getEncodedBody()
        };
        fetch(this.props.url + '/oauth/token', settings)
            .then(blob => {
                return blob.json()
        })
            .then(res => this.props.onResult('', res))
            .catch(err => {
            console.log(err);
            this.props.onResult(err, '');
        });
        event.preventDefault();
    }

    getHeaders() {
        const clientHeaders = new Headers();
        clientHeaders.append('content-type', 'application/x-www-form-urlencoded');
        clientHeaders.append('authorization', 'Basic ' + this.getBase64Client());
        return clientHeaders;
    }

    getEncodedBody() {
        const encodedBody = new URLSearchParams();
        encodedBody.append("grant_type", "password");
        encodedBody.append("username", this.state.username);
        encodedBody.append("password", this.state.password);
        encodedBody.append("scope", this.props.scope);
        return encodedBody;
    }

    getBase64Client() {
        return btoa(this.props.clientId + ":" + this.props.clientSecret);
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <label>
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange}
                           name="username"/>
                    <input type="text" value={this.state.password} onChange={this.handlePasswordChange}
                           name="password"/>
                    <input type="submit" value="Login"/>
                </label>
            </form>
        );
    }

}
import React, {Component} from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            refresh_token: props.refresh_token,
        };

        if(this.props.username) {
            this.state.username = this.props.username;
        }
        if(this.props.password) {
            this.state.password = this.props.password;
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        if (this.state.username && this.state.password) {
            this.handleLogin();
        }
    }

    componentDidMount() {
        if (this.props.refresh_token) {
            this.refreshToken(true);
        }
    }

    handleLogin(event) {
        const settings = {
            method: "POST",
            headers: this.getHeaders(),
            body: this.getEncodedLoginBody()
        };
        fetch(this.props.url + '/oauth/token', settings)
            .then(blob => {
                return blob.json()
            })
            .then(res => {
                this.setState({
                    refresh_token: res.refresh_token
                });
                setInterval(this.refreshToken.bind(this), (res.expires_in - 30)*1000);
                this.props.onResult('', res)
            })
            .catch(err => {
                console.log(err);
                this.props.onResult(err, '');
            });
        if (event) event.preventDefault();
    }

    refreshToken(setInterval = false) {
        const settings = {
            method: "POST",
            headers: this.getHeaders(),
            body: this.getEncodedRefreshBody()
        };
        fetch(this.props.url + '/oauth/token', settings)
            .then(blob => {
                return blob.json()
            })
            .then(res => {
                if (setInterval) {
                    setInterval(this.refreshToken.bind(this), (res.expires_in - 30)*1000);
                }
                this.setState({
                    refresh_token: res.refresh_token
                });
                this.props.onResult('', res)
            })
            .catch(err => {
                console.log(err);
                this.props.onResult(err, '');
            });
    }

    getHeaders() {
        const clientHeaders = new Headers();
        clientHeaders.append('content-type', 'application/x-www-form-urlencoded');
        clientHeaders.append('authorization', 'Basic ' + this.getBase64Client());
        return clientHeaders;
    }

    getEncodedLoginBody() {
        const encodedBody = new URLSearchParams();
        encodedBody.append("grant_type", "password");
        encodedBody.append("username", this.state.username);
        encodedBody.append("password", this.state.password);
        encodedBody.append("scope", this.props.scope);
        return encodedBody;
    }

    getEncodedRefreshBody() {
        const encodedBody = new URLSearchParams();
        encodedBody.append("grant_type", "refresh_token");
        encodedBody.append("refresh_token", this.state.refresh_token);
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
        if (!this.state.refresh_token) {
            return (
                <form className="form-horizontal" onSubmit={this.handleLogin}>
                    <h1>Login to continue </h1>
                    <div className="form-group">
                        <label className="cols-sm-2 control-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-addon"><i class="glyphicon glyphicon-user" aria-hidden="true"></i></span>
                            <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} name="username"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="cols-sm-2 control-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-addon"><i class="glyphicon glyphicon-header" aria-hidden="true"></i></span>
                            <input type="text" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} name="password"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="submit" className="form-control" value="Login"/>
                        </label>
                    </div>
                </form>
            );
        } else return null;
    }
}
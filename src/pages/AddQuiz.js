import React, { Component } from 'react';
import TextFieldGroup from '../components/TextFieldGroup';
import Login from '../components/user/Login';

class AddQuiz extends Component {
    constructor(props){
        super(props);
        this.state = {title: '', description: '', category: '', image: null, token: ''};
        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLoginResult = this.onLoginResult.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault()
        console.log('DEBUG PURPOSSES: ' + this.state.title + this.state.description);

        let form = new FormData();
        form.append('title', this.state.title);
        form.append('description', this.state.description);
        form.append('category', this.state.category);
        form.append('image', this.state.image);

        fetch('http://localhost:3000/api/quizzes/', {
            method: 'POST',
            body: form
        })
            .then((result) => result.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error));
    }

    render() {
        /*if (!this.state.token) {
            return(
                <Login url="http://maatwerk.works"
                       clientId="Quiz" clientSecret="f5889489-ea7b-4b36-93d9-4cce40e11867"
                       scope="Quiz" refresh_token={localStorage.getItem('refresh_token')}
                       onResult={this.onLoginResult}/>)
        } else {*/
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <TextFieldGroup
                    field="title"
                    value={this.state.title}
                    label="Title"
                    placeholder="Title"
                    addon="glyphicon glyphicon-header"
                    onChange={this.handleChange}/>
                <TextFieldGroup
                    field="description"
                    value={this.state.description}
                    label="Description"
                    placeholder="Description"
                    addon="glyphicon glyphicon-align-left"
                    onChange={this.handleChange}/>
                <TextFieldGroup
                    field="category"
                    value={this.state.category}
                    label="Category"
                    placeholder="Category"
                    addon="glyphicon glyphicon-book"
                    onChange={this.handleChange}/>
                <TextFieldGroup
                    field="image"
                    value={this.state.image}
                    label="Image"
                    placeholder="Image"
                    type="file"
                    addon="glyphicon glyphicon-picture"
                    onChange={this.handleChange}/>
                <button className="btn btn-default btn-group-lg">
                    <span className="glyphicon glyphicon-cloud-upload"></span> Upload!
                </button>
            </form>
        )
        //}
    }

    onLoginResult(error, token) {
        if (error) return console.log(error);
        if (token) console.log(token); //do as you wish with the token, Yannick...
        this.setState({token: token});
        localStorage.setItem('refresh_token', token.refresh_token);

    }
}

export default  AddQuiz;
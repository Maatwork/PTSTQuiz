import React, {Component} from 'react';
import TextFieldGroup from '../components/TextFieldGroup';
import Login from '../components/user/Login';

class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', description: '', file: null, answer: '', duration: 0, token: ''};
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLoginResult = this.onLoginResult.bind(this);
    }


    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleFileChange(event) {
        console.log(event);
        if(event) {
            console.log(event.target.files);
            this.setState({file: event.target.files[0]})
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        var categories = ['Test'];
        categories.push(this.state.description);

        const data = new FormData();
        data.append('text', this.state.title);
        data.append('category', categories);
        data.append('answer', this.state.answer);
        data.append('duration', this.state.duration);
        data.append('quizId', this.props.match.params.id);
        data.append('file', this.state.file)

        let url = "http://localhost:3000/api/questions/" + this.props.match.params.id;
        console.log(url);

        fetch(url, {
            method: 'POST',
            body: data
        })
            .then((result) => result.json())
            .then((json) => console.log(json))
            .catch((error) => console.log(error));
    }


    render() {
        /*if (!this.state.token) {
            return(
            <Login url="http://localhost:3000"
                   clientId="Quiz" clientSecret="f5889489-ea7b-4b36-93d9-4cce40e11867"
                   scope="Quiz"
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
                    field="answer"
                    value={this.state.answer}
                    label="Answer"
                    placeholder="Answer"
                    addon="glyphicon glyphicon-chevron-down"
                    onChange={this.handleChange}/>
                <TextFieldGroup
                    field="duration"
                    value={this.state.duration}
                    label="Duration"
                    type="number"
                    placeholder="Duration"
                    addon="glyphicon glyphicon-time"
                    onChange={this.handleChange}/>
                <TextFieldGroup
                    field="file"
                    value={this.state.file}
                    label="Media file"
                    type="file"
                    addon="glyphicon glyphicon-header"
                    onChange={this.handleFileChange} hidden/>
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
    }
}

export default AddQuestion;
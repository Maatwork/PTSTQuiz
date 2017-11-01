import React, { Component } from 'react';
import Login from '../components/user/Login';

class AddQuestion extends Component {
    constructor(props){
        super(props);
        this.state = {title: '', description: '', token: ''};
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLoginResult = this.onLoginResult.bind(this);
    }



    handleTitleChange(event) {
        this.setState({title: event.target.value})
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value})
    }

    handleSubmit(event){
        console.log('DEBUG PURPOSSES: ' + this.state.title + this.state.description);

        fetch('http://localhost:3000/api/categories/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Accept': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
            })
        })
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
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="cols-sm-2 control-label">Title of new question</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i class="glyphicon glyphicon-header" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="cols-sm-2 control-label">Description of new question</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i class="glyphicon glyphicon-align-left" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="cols-sm-2 control-label">Media (this can be an image, video or mp3)</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i class="glyphicon glyphicon-film" aria-hidden="true"></i></span>
                                <input id="input-b4a" className="input-b4a" type="file" class="file" readonly="true"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="cols-sm-2 control-label">Answer</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i class="glyphicon glyphicon-chevron-down" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" placeholder="Answer" value={this.state.description} onChange={this.handleDescriptionChange} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="cols-sm-2 control-label">Duration of question</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i class="glyphicon glyphicon-time" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" placeholder="Duration" value={this.state.description} onChange={this.handleDescriptionChange} />
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-default btn-group-lg" onClick={this.handleSubmit}>
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

export default  AddQuestion;
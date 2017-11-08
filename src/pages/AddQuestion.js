import React, {Component} from 'react';
import Login from '../components/user/Login';

class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', description: '', file: null, answer: '', duration: 0, token: ''};
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLoginResult = this.onLoginResult.bind(this);
    }


    handleTitleChange(event) {
        this.setState({title: event.target.value})
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value})
    }

    handleFileChange(event) {
        console.log(event);
        if(event) {
            console.log(event.target.files);
            this.setState({file: event.target.files[0]})
        }
    }

    handleAnswerChange(event) {
        this.setState({answer: event.target.value})
    }

    handleDurationChange(event) {
        this.setState({duration: event.target.value})
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
        data.append('quizId', this.props.match.params.id)

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
                <div className="form-group">
                    <label className="cols-sm-2 control-label">Title of new question</label>
                    <div className="cols-sm-10">
                        <div className="input-group">
                            <span className="input-group-addon"><i class="glyphicon glyphicon-header" aria-hidden="true"></i></span>
                            <input type="text" className="form-control" placeholder="Title" value={this.state.title}
                                   onChange={this.handleTitleChange}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="cols-sm-2 control-label">Description of new question</label>
                    <div className="cols-sm-10">
                        <div className="input-group">
                            <span className="input-group-addon"><i class="glyphicon glyphicon-align-left" aria-hidden="true"></i></span>
                            <input type="text" className="form-control" placeholder="Description"
                                   value={this.state.description} onChange={this.handleDescriptionChange}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="cols-sm-2 control-label">Answer</label>
                    <div className="cols-sm-10">
                        <div className="input-group">
                            <span className="input-group-addon"><i class="glyphicon glyphicon-chevron-down" aria-hidden="true"></i></span>
                            <input type="text" className="form-control" placeholder="Answer"
                                   value={this.state.answer} onChange={this.handleAnswerChange}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="cols-sm-2 control-label">Duration of question</label>
                    <div className="cols-sm-10">
                        <div className="input-group">
                            <span className="input-group-addon"><i class="glyphicon glyphicon-time" aria-hidden="true"></i></span>
                            <input type="number" min="0" className="form-control" placeholder="Duration"
                                   value={this.state.duration} onChange={this.handleDurationChange}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="cols-sm-2 control-label">Media (this can be an image, video or mp3)</label>
                    <div className="cols-sm-10">
                        <div className="input-group">
                            <span className="input-group-addon"><i class="glyphicon glyphicon-film" aria-hidden="true"></i></span>

                            <div class="btn-group btn-group-justified">
                                <label class="btn btn-info">
                                    Browse <input id="file" className="inputfile" type="file" onChange={this.handleFileChange} hidden/>
                                </label>
                            </div>


                        </div>
                    </div>
                </div>
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
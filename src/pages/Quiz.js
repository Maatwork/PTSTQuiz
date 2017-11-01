import React, { Component } from 'react';

class QuestionList extends Component {
    constructor() {
        super();
        this.state={items:[]};
    }

    componentDidMount(){
        var url = "http://localhost:3000/api/questions/" + this.props.match.params.id;
        fetch(url)
            .then(res => {
                res.json().then((data) => {
                    this.setState({ items: data })
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-offset-9">
                        <a href={"/Quiz/" + this.props.match.params.id + "/addQuestion"} className="btn btn-default btn-lg">
                            <span className="glyphicon glyphicon-question-sign"></span> Add new Question
                        </a>
                    </div>
                </div>
                <div className="list-group">
                    {this.state.items.length ? this.state.items.map(item =>
                        <a className="list-group-item" key={item.id}>
                            <h4 className="list-group-item-heading">{item.text}</h4>
                        </a>): <h1> Oops! This seems to be empty</h1>}
                </div>
            </div>
        );
    }
}

export default QuestionList;

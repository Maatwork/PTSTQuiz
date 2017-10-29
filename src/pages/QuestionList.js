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
            <div class="list-group">
                {this.state.items.length ? this.state.items.map(item =>
                    <a className="list-group-item" key={item.id}>
                        <h4 class="list-group-item-heading">{item.text}</h4>
                    </a>): <h1> Oops! This seems to be empty</h1>}
            </div>
        );
    }
}

export default QuestionList;

import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state={items:[]};
    }

    componentDidMount(){
        fetch("http://localhost:3000/api/quizzes/")
            .then(res => {
                console.log(res);
                res.json().then((data) => {
                    console.log(data);
                    /*
                    Toevoegen aan bestaande lijst :)
                    var items = this.state.items.slice()
                    items.push(data.rows[0])
                    */
                    this.setState({ items: data });
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div className="col-md-offset-9">
                        <a href="/Quiz/AddQuiz" className="btn btn-default btn-lg">
                            <span className="glyphicon glyphicon-th-list"></span> Add new Quiz
                        </a>
                    </div>
                </div>
                <div className="list-group">
                    {this.state.items.length ? this.state.items.map(item =>
                        <a href={"/Quiz/" + item.id} className="list-group-item" key={item.id}>
                            <h4 className="list-group-item-heading">{item.title}</h4>
                            <p className="list-group-item-text">{item.description}</p>
                        </a>): <p> Loading... </p>}
                </div>
            </div>
        );
  }
}

export default App;

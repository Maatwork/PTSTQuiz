import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state={items:[]};
    }

    componentDidMount(){
        fetch(settings.url)
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
            <div className="list-group">
                {this.state.items.length ? this.state.items.map(item =>
                    <a href={"/category/" + item.id} className="list-group-item" key={item.id}>
                        <h4 className="list-group-item-heading">{item.title}</h4>
                        <p className="list-group-item-text">{item.description}</p>
                    </a>): <p> Loading... </p>}

            </div>
        );
  }
}

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/api/categories/",
    "method": "GET",
    "headers": {
        "cache-control": "no-cache",
    }
}

export default App;

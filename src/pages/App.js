import React, { Component } from 'react';
import '../src/css/App.css';



class App extends Component {
    constructor() {
        super();
        this.state={items:[]};
    }

    componentDidMount(){
        fetch(settings.url)
            .then(res => {
                //console.log(res);
                res.json().then((data) => {
                    console.log(data);
                    /*
                    Toevoegen aan bestaande lijst :)
                    var items = this.state.items.slice()
                    items.push(data.rows[0])
                    */
                    this.setState({ items: data.rows })
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
                    <a href={"/category/" + item.categoryid} class="list-group-item">
                        <h4 class="list-group-item-heading">{item.title}</h4>
                        <p class="list-group-item-text">{item.description}</p>
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

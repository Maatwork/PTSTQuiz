import React, { Component } from 'react';
import './css/App.css';



class App extends Component {
    constructor() {
        super();
        this.state={items:[]};
    }

    componentDidMount(){
        fegitch(settings.url, settings)
            .then(result=>result.json())
            .then(items=>this.setState({items}))
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
    return (
        <div class="row">
            <div class="col-xs-5 col-md-3">
                {this.state.items.length ? this.state.items.map(item =>
                    <a href="#" class="thumbnail">
                        <img src="test" alt="img"/>
                        <div class = "caption">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </a>) : <h3> Loading ..</h3>}
                )}
            </div>
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

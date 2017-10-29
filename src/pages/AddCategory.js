import React, { Component } from 'react';

class AddCategory extends Component {
    constructor(props){
        super(props);
        this.state = {title: '', description: ''};
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleTitleChange(event) {
        this.setState({title: event.target.value})
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value})
    }

    handleSubmit(event){
        alert('DEBUG PURPOSSES: ' + this.state.title + this.state.description);
    }

    render() {
        return (
                <form className="form-horizontal" >
                    <div className="form-group">
                        <label for="title" className="cols-sm-2 control-label">Title of new category</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i class="glyphicon glyphicon-header" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="name" className="cols-sm-2 control-label">Description of new category</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i class="glyphicon glyphicon-align-left" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-default btn-group-lg" onClick={this.handleSubmit}>
                        <span className="glyphicon glyphicon-cloud-upload"></span> Upload!
                    </button>
                </form>

        )
    }
}

export default  AddCategory;
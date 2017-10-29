import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.css';

import registerServiceWorker from './registerServiceWorker';
import { Router, Route, BrowserRouter} from 'react-router-dom'

import AppPage from "./pages/App.js";
import QuestionList from "./pages/QuestionList.js";
import AddCategory from "./pages/AddCategory";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/Index" component={AppPage}/>
            <Route path="/category/:id" component={QuestionList}/>
            <Route path="/categories/addCategory" component={AddCategory}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);registerServiceWorker();



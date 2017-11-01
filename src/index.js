import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.css';

import registerServiceWorker from './registerServiceWorker';
import { Switch, Route, BrowserRouter} from 'react-router-dom'

import AppPage from "./pages/Index.js";
import Quiz from "./pages/Quiz.js";
import AddQuiz from "./pages/AddQuiz";
import AddQuestion from "./pages/AddQuestion";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/Index" component={AppPage}/>
                <Route path="/Quiz/:id/AddQuestion" component={AddQuestion}/>
                <Route path="/Quiz/AddQuiz" component={AddQuiz}/>
                <Route path="/Quiz/:id" component={Quiz}/>
            </Switch>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);registerServiceWorker();



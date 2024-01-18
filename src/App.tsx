import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";

import './App.css';
import PostForm from './pages/PostForm';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/"> <Home/> </Route>
                <Route exact path="/create">
                  <PostForm/>
                </Route>
                <Route
                    path="/edit/:postId"
                    render={({ match }) => (
                        <PostForm isEditMode={true} postId={match.params.postId} />
                    )}
                />
            </Switch>
        </Router>
    );
}

export default App;

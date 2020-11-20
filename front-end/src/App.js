import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { ArticlePage } from './pages/ArticlePage';
import { ArticlesListPage } from './pages/ArticlesListPage';
import { HomePage } from './pages/HomePage';
import { NavBar } from './NavBar';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <div id="page-body">
                    <Switch>
                        <Route path="/" exact>
                            <HomePage />
                        </Route>
                        <Route path="/about">
                            <AboutPage />
                        </Route>
                        <Route path="/articles-list">
                            <ArticlesListPage />
                        </Route>
                        <Route path="/articles/:id">
                            <ArticlePage />
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Authentication from './Authentication/Authentication';
import initializeAuthentication from './Firebase/firebase.initialize';
import Header from './Header/Header'
import Home from './Home/Home';
import Registration from './Registration/Registration';

;
initializeAuthentication();

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/registration">
            <Registration></Registration>
          </Route>
          <Route path="/authentication">
            <Authentication></Authentication>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

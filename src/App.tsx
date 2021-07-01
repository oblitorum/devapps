import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home } from "home";
import { Attribution } from "attribution";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/attributions">
          <Attribution />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

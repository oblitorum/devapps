import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home } from "home";
import { Attribution } from "attribution";
import { Exec } from "exec";

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
        <Route
          path="/exec"
          component={ Exec }
        />
      </Switch>
    </Router>
  );
}

export default App;

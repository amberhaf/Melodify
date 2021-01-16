import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import OnePlayer from "./OnePlayer";
import Effects from "./Effects";
import About from "./About";
import TwoPlayer from "./TwoPlayer";
import Simple from "./Simple";
import Choose from "./Choose";

const App = () => (
  <BrowserRouter>
    <div>
      {/*Routes between different page component*/}
      <Switch>
        <Route component={OnePlayer} path="/oneplayer" exact={true} />
        <Route component={Effects} path="/effects" exact={true} />
        <Route component={About} path="/" exact={true} />
        <Route component={TwoPlayer} path="/twoplayer" exact={true} />
        <Route component={Simple} path="/simple" exact={true} />
        <Route component={Choose} path="/choose" exact={true} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;

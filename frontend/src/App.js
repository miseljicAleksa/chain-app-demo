import { BrowserRouter, Switch } from "react-router-dom";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { RapidApiContent } from "./Pages/RapidApiContent";
import AppBarComponent from "./components/AppBar";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { React, useEffect, useState } from "react";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";
import axios from "axios";
import { RapidApiProvider } from "./RapidApiContext";

// TODO: change to env variable
const verifyUrl =
  "https://c06gh9txo5.execute-api.us-east-1.amazonaws.com/prod/verify";

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  useEffect(() => {
    const token = getToken();
    if (
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }

    const requestConfig = {
      headers: {
        "x-api-key": "46N81lTd9p39i4YH19SO07KNV8XGgnS353ILwr6O", // TODO: change to env variable
      },
    };

    const requestBody = {
      username: getUser(),
      token: token,
    };

    axios
      .post(verifyUrl, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setIsAuthenticating(false);
      })
      .catch(() => {
        // resetUserSession(); // TODO: I have bug here, goes into catch event if its success? O.O
        setIsAuthenticating(false);
      });
  }, []);

  const token = getToken();
  if (isAuthenticating && token) {
    return <div>Authenticating...</div>;
  }

  return (
    <div className="App">
      <RapidApiProvider>
        <BrowserRouter>
          <AppBarComponent />
          <Switch>
              <PublicRoute exact path="/" component={<div>home</div>} />
              <PublicRoute  path="/register" component={Register} />
              <PublicRoute  path="/login" component={Login} />
              <PrivateRoute
                path="/rapid-api-content"
                component={RapidApiContent}
              />
            </Switch>
        </BrowserRouter>
      </RapidApiProvider>
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MUI_THEME, THEME } from "./assets/theme/setupTheme";
import store from "./configStore";
import LocaleProvider from "./utils/localeProvider/LocaleProvider";
import * as serviceWorker from "./serviceWorker";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function(registration) {})
    .catch(function(err) {});
}

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <LocaleProvider>
        <ThemeProvider theme={THEME}>
          <MuiThemeProvider theme={MUI_THEME}>
            <SnackbarProvider maxSnack={3}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SnackbarProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </LocaleProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register();

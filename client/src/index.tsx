// React
import React from "react";
import ReactDOM from "react-dom";

import { init } from "@sentry/react";
import { Integrations } from "@sentry/tracing";

// Redux
import { Provider } from "react-redux";
import { store } from "./store";

// Component
import App from "./AppConfig";

// styles
import "./commonStyles/_fonts.module.scss";
import "./commonStyles/_reset.module.scss";
import "./commonStyles/_common.module.scss";
import "./commonStyles/main.module.scss";

const rootElement = document.getElementById("root");

init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  debug: false,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

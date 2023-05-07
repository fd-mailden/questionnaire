import React from "react";
import ReactDOM from "react-dom";
import "./assets/style/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./storToolkit/index";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={1}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

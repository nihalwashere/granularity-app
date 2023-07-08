import React from "react";
import { SnackbarProvider } from "notistack";
import RootContainer from "./containers/root";

const App = () => (
  <SnackbarProvider
    maxSnack={3}
    autoHideDuration={3000}
    hideIconVariant
    preventDuplicate
  >
    <RootContainer />
  </SnackbarProvider>
);

export default App;

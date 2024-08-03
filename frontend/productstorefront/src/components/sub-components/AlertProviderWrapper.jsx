import React, { createContext } from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 3000, // time (in ms) to auto close the alert
  position: positions.TOP_RIGHT,
  offset: 20,
};

const TopRightAlertContext = createContext();

const AlertProviderWrapper = ({ children }) => (
  <AlertProvider template={AlertTemplate}>
    <AlertProvider
      template={AlertTemplate}
      position={options.position}
      context={TopRightAlertContext}
    >
      {children}
    </AlertProvider>
  </AlertProvider>
);

export { AlertProviderWrapper, TopRightAlertContext, options };

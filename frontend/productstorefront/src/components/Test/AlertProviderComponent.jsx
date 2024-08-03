import React, { createContext } from "react";
import { useAlert, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 3000, // time (in ms) to auto close the alert
  position: positions.TOP_RIGHT, // position where the alert is shown
};

const TopRightAlertContext = createContext();

const AlertComponent = () => {
  const alert = useAlert();
  const topRightAlert = useAlert(TopRightAlertContext);

  return (
    <div>
      <button onClick={() => alert.show("This is an alert!", options)}>
        Show Alert
      </button>
      <button
        onClick={() =>
          topRightAlert.show(
            "This is an alert in the top right corner!",
            options
          )
        }
      >
        Show Top Right Alert
      </button>
    </div>
  );
};

const AlertProviderComponent = () => (
  <AlertProvider template={AlertTemplate}>
    <AlertProvider
      template={AlertTemplate}
      position={positions.TOP_RIGHT}
      context={TopRightAlertContext}
    >
      <AlertComponent />
    </AlertProvider>
  </AlertProvider>
);

export default AlertProviderComponent;

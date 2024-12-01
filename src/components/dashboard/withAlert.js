// withAlert.js
import { useAlert } from './AlertContext'; // Path to your AlertContext

export const withAlert = (WrappedComponent) => {
  return (props) => {
    const alert = useAlert();
    return <WrappedComponent {...props} alert={alert} />;
  };
};

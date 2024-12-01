// AlertContext.js (create this file)
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertContext = createContext({ showAlert: () => {} }); // Provide default value

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' }); // Store message and severity
    // const alertPortal = document.getElementById('alert-portal');
    const [alertPortal, setAlertPortal] = useState(null);  // Initialize as null


  useEffect(() => {
    setAlertPortal(document.getElementById('alert-portal'));
  }, []);
  
    const showAlert = (message, severity = 'info') => { // Function to show alerts
        setAlert({ open: true, message, severity });
    };

    const closeAlert = () => {
        setAlert({ ...alert, open: false });
    };

    useEffect(() => {  // useEffect to handle auto-closing
        let timer;
       
        if (alert.open && alertPortal) { // Check both alert.open AND alertPortal
            timer = setTimeout(closeAlert, 3000); // Simplify the setTimeout call
          }
    
          return () => clearTimeout(timer); // Cleanup

    
        }, [alert.open, alertPortal]); // Correct dependency array

    const AlertComponent = alertPortal && createPortal( // Use a portal to render the alert
        <Collapse in={alert.open}>
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={closeAlert}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                severity={alert.severity}
                sx={{
                    mb: 2, position: 'fixed', top: 0,right:"-10%",
                    transform: 'translateX(-50%)', width: '30%', zIndex: 1300 , 
                    
                }}
                role="alert"
                onClose={closeAlert}  
            >
                {alert.message}
            </Alert>    </Collapse>,
        alertPortal
    )


    return (
        <AlertContext.Provider value={{ showAlert }}>
        {React.Children.map(children, child => {  // Map over children
             if (React.isValidElement(child)) {
              return React.cloneElement(child, { alert: { showAlert } }); // Inject alert into props
             }
             return child;
           })}
           {AlertComponent}
    </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);

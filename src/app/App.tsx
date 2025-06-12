import React from 'react';
import AppRouter from "./routes/AppRouter.tsx";
import './styles/index.css';
import {ToastContainer} from "react-toastify";
const App = () => {
    return(
    <>
        <AppRouter />
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </>
    );
};

export default App;
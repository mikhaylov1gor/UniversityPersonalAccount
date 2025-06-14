import React from 'react';
import AppRouter from "./routes/AppRouter.tsx";
import './styles/index.css';
import {ToastContainer} from "react-toastify";
import {NavbarMenu} from "@/features/menu/ui/NavbarMenu.tsx";
const App = () => {
    return(
        <>
            <NavbarMenu avatarUrl={"123"}/>
            <AppRouter/>
        </>
    );
};

export default App;
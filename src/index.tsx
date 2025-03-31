import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import App from "./app/App.tsx";
import LanguageSelect from "./features/language-selector/ui/LanguageSelect.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LanguageSelect/>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import App from "./app/App.tsx";
import LanguageSelect from "./features/language-selector/ui/LanguageSelect.tsx";
import {ToasterProvider} from "@/app/providers/Toast/ToasterProvider.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ToasterProvider>
                <LanguageSelect/>
                <App/>
            </ToasterProvider>
        </BrowserRouter>
    </React.StrictMode>
);

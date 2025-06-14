import '@/shared/ui/design/_tokens.scss';
import '@/app/styles/index.css'
import '@/shared/ui/design/typography.scss'
import React, {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import App from "./app/App.tsx";
import {ToasterProvider} from "@/app/providers/Toast/ToasterProvider.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StrictMode>
        <BrowserRouter>
            <ToasterProvider>
                <App/>
            </ToasterProvider>
        </BrowserRouter>
    </StrictMode>,
)

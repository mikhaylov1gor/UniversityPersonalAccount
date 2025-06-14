import React, {createContext, JSX, ReactNode, useContext, useState} from "react";
import {Icon} from "@/shared/ui/atoms/Icon/Icon.tsx";
import styles from './toast.module.scss';

type ToastType = "info" | "success" | "error" | "warning";

type Toast = {
    id: number;
    title: string;
    message: string;
    type: ToastType
}

type ToasterContextType = {
    showToast: (title: string, message: string, type: ToastType) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
    const context = useContext(ToasterContext);
    if (!context) throw new Error("useToaster must be used within ToasterProvider");
    return context;
};

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (title: string, message: string, type: ToastType) => {
        const newToast: Toast = {
            id: Date.now(),
            title,
            message,
            type,
        };
        setToasts((prev) => [...prev, newToast]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
        }, 3000);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const typeInfo: Record<ToastType, { icon: JSX.Element; title: string }> = {
        info: {
            icon: <Icon name="info-black" size={20} fill={'none'}/>,
            title: "Информация",
        },
        success: {
            icon: <Icon name="check-black" size={20} fill={'none'}/>,
            title: "Успех",
        },
        error: {
            icon: <Icon name="close-circle-black" size={20} fill={'none'} />,
            title: "Ошибка",
        },
        warning: {
            icon: <Icon name="circle-warning-black" size={20} fill={'none'}/>,
            title: "Предупреждение",
        },
    };

    return (
        <ToasterContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-5 right-5 space-y-3 z-50 w-[300px]">
                {toasts.map((toast) => {
                    const info = typeInfo[toast.type];
                    return (
                        <div
                            key={toast.id}
                            className="rounded-lg shadow-md overflow-hidden"
                        >
                            <div
                                className={`flex items-center justify-between px-4 py-2 ${styles[`toast-${toast.type}`]}`}>
                                <div className="flex items-center gap-2">
                                    {info.icon}
                                    <span className="font-semibold">{info.title}</span>
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="text-inherit hover:opacity-70"
                                >
                                    <Icon name="close-md-black" size={20} fill={'none'}/>
                                </button>
                            </div>
                            <div className="px-4 py-3 text-sm text-gray-800">{toast.message}</div>
                        </div>
                    );
                })}
            </div>
        </ToasterContext.Provider>
    );
};
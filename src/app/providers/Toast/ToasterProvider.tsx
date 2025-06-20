import React, {
    createContext,
    JSX,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import {Icon} from "@/shared/ui/atoms/Icon/Icon.tsx";
import styles from './toast.module.scss';
import {useTranslation} from "react-i18next";
import {registerToast} from "@/app/providers/Toast/ToastController.ts";

type ToastType = "info" | "success" | "error" | "warning";

type Toast = {
    id: number;
    title: string;
    message: string;
    type: ToastType;
};

type ToasterContextType = {
    showToast: (title: string, message: string, type: ToastType) => void;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
    const context = useContext(ToasterContext);
    if (!context) throw new Error("useToaster must be used within ToasterProvider");
    return context;
};

export const ToasterProvider = ({children}: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const {t} = useTranslation();

    useEffect(() => {
        registerToast(showToast, t);
    }, []);

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
            title: t("toast.info"),
        },
        success: {
            icon: <Icon name="check-black" size={20} fill={'none'}/>,
            title: t("toast.success"),
        },
        error: {
            icon: <Icon name="close-circle-black" size={20} fill={'none'}/>,
            title: t("toast.error"),
        },
        warning: {
            icon: <Icon name="circle-warning-black" size={20} fill={'none'}/>,
            title: t("toast.warning"),
        },
    };

    return (
        <ToasterContext.Provider value={{showToast}}>
            {children}
            <div className={styles.toastContainer}>
                {toasts.map((toast) => {
                    const info = typeInfo[toast.type];
                    return (
                        <div
                            key={toast.id}
                            className={styles.toastWrapper}
                        >
                            <div
                                className={`${styles.toastHeader} ${styles[`toast-${toast.type}`]}`}
                            >
                                <div className="flex items-center gap-2">
                                    {info.icon}
                                    <span>{info.title}</span>
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className={styles["toast-close-button"]}
                                >
                                    <Icon name="close-md-black" size={20} fill={'none'}/>
                                </button>
                            </div>
                            <div className={styles.toastMessage}>{toast.message}</div>
                        </div>
                    );
                })}
            </div>
        </ToasterContext.Provider>
    );
};

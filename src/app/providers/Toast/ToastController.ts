import { TFunction } from "i18next";

type ToastType = "info" | "success" | "error" | "warning";

let showToastInternal: (title: string, message: string, type: ToastType) => void;
let t: TFunction = (s) => s; // fallback

export const registerToast = (
    showToastFn: typeof showToastInternal,
    tFn?: TFunction
) => {
    showToastInternal = showToastFn;
    if (tFn) t = tFn;
};

export const toast = {
    info: (message: string, title?: string) =>
        showToastInternal?.(title || t("toast.info"), message, "info"),

    success: (message: string, title?: string) =>
        showToastInternal?.(title || t("toast.success"), message, "success"),

    warning: (message: string, title?: string) =>
        showToastInternal?.(title || t("toast.warning"), message, "warning"),

    error: (message: string, title?: string) =>
        showToastInternal?.(title || t("toast.error"), message, "error"),
};

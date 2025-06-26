import React from "react";
import {useTranslation} from "react-i18next";
import styles from "./CreateUsefulServiceModal.module.scss";
import {usefulServiceStoreApi} from "@/shared/services/useful.service";
import {Icon} from "@/shared/ui/atoms/Icon/Icon";
import Button from "@/shared/ui/atoms/Button/Button";

interface Props {
    isOpen: boolean;
    serviceId: string;
    onClose: () => void;
    onSuccess?: () => void;
}

export const DeleteUsefulServiceModal: React.FC<Props> =
    ({isOpen, serviceId, onClose, onSuccess}) => {
        const {t} = useTranslation();

        const handleSubmit = async () => {
            try {
                await usefulServiceStoreApi.deleteServiceForAdmin(serviceId);
                onSuccess?.();
                onClose();
                window.location.reload();
            } catch (e: any) {
                console.log(e.response.data.errors);
            }
        };
        if (!isOpen) return null;

        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <div className={styles.closeButton} onClick={onClose}>
                        <Icon size={24} name={'close-md-black'} fill={'none'}></Icon>
                    </div>
                    <h3 className={styles.title}>{t("admin.usefulServices.modal.are_u_sure" as any)}</h3>

                    <div className={styles.buttons}>
                        <Button variant="primary" onClick={handleSubmit}>
                            {t("common.delete" as any)}
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            {t("common.cancel" as any)}
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

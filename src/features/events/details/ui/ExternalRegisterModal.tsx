import React, { useState } from "react";
import styles from "./ExternalRegisterModal.module.scss";
import { EventExternalRegisterDto } from "@/shared/models/requests/event/eventExternalRegisterDto";
import Button from "@/shared/ui/atoms/Button/Button";
import Input from "@/shared/ui/atoms/Input/Input";
import { EventsStoreApi } from "@/shared/services/events.service";
import { useTranslation } from "react-i18next";

interface Props {
    isOpen: boolean;
    eventId: string;
    onClose: () => void;
    onSuccess?: () => void;
}

export const ExternalRegisterModal: React.FC<Props> = ({ isOpen, eventId, onClose, onSuccess }) => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState<EventExternalRegisterDto>({
        eventId,
        name: "",
        email: "",
        phone: "",
        additionalInfo: ""
    });

    const [loading, setLoading] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await EventsStoreApi.registerToEventAsExternal(formData);

            const registered = JSON.parse(localStorage.getItem("guestRegisteredEvents") || "[]");
            if (!registered.includes(eventId)) {
                registered.push(eventId);
                localStorage.setItem("guestRegisteredEvents", JSON.stringify(registered));
            }

            onSuccess?.();
            onClose();
        } catch (e) {
            console.error("Ошибка при внешней регистрации", e);
        } finally {
            setLoading(false);
        }
    };
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h3>{t("events.details.modal.title" as any)}</h3>

                <Input
                    name="name"
                    width="100%"
                    label={t("events.details.modal.name" as any)}
                    value={formData.name || ""}
                    onInput={handleChange}
                />
                <Input
                    name="phone"
                    width="100%"
                    label={t("events.details.modal.phone" as any)}
                    value={formData.phone || ""}
                    onInput={handleChange}
                />
                <Input
                    name="email"
                    width="100%"
                    label={t("events.details.modal.email" as any)}
                    value={formData.email || ""}
                    onInput={handleChange}
                />

                <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo || ""}
                    onChange={handleChange}
                    placeholder={t("events.details.modal.additionalInfo" as any)}
                />

                <div className={styles.buttons}>
                    <Button variant="primary" style={{minWidth: '50%'}} onClick={handleSubmit} disabled={loading}>
                        {t("common.save" as any)}
                    </Button>
                    <Button variant="outline" style={{minWidth: '50%'}} onClick={onClose}>
                        {t("common.cancel" as any)}
                    </Button>
                </div>
            </div>
        </div>
    );
};

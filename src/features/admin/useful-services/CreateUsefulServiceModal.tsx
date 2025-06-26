import React, {useEffect, useState} from "react";
import styles from "./CreateUsefulServiceModal.module.scss";
import {useTranslation} from "react-i18next";
import Input from "@/shared/ui/atoms/Input/Input";
import Button from "@/shared/ui/atoms/Button/Button";
import {Icon} from "@/shared/ui/atoms/Icon/Icon";
import {UsefulServiceEditCreateDto} from "@/shared/models/requests/usefulServiceEditCreateDto";
import {UsefulServiceCategory} from "@/shared/models/enums/usefulServiceCategory";
import DropdownInput from "@/shared/ui/atoms/DropdownInput/DropdownInput";
import {usefulServiceStoreApi} from "@/shared/services/useful.service";
import {UsefulServiceDto} from "@/shared/models/responses/usefulService/usefulServiceDto";

interface Props {
    isOpen: boolean;
    service?: UsefulServiceDto;
    onClose: () => void;
    onSuccess?: () => void;
}

export const CreateUsefulServiceModal: React.FC<Props> = ({ isOpen, service, onClose, onSuccess }) => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState<UsefulServiceEditCreateDto>({
        category: UsefulServiceCategory.ForAll,
        title: null,
        description: null,
        link: null,
        termsOfDisctribution: null,
        logoId: null,
    });

    useEffect(() => {
        if (service) {
            setFormData({
                category: service.category,
                title: service.title,
                description: service.description,
                link: service.link,
                termsOfDisctribution: service.termsOfDisctribution,
                logoId: service.logo?.id,
            });
        } else {
            setFormData({
                category: UsefulServiceCategory.ForAll,
                title: null,
                description: null,
                link: null,
                termsOfDisctribution: null,
                logoId: null,
            });
        }
    }, [service]);

    const [loading, setLoading] = useState(false);
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData(prev => ({ ...prev, category: value as UsefulServiceCategory, }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (service) {
                await usefulServiceStoreApi.editServiceForAdmin(service.id, formData);
            }
            else {
                await usefulServiceStoreApi.createServiceForAdmin(formData);
            }
            onSuccess?.();
            onClose();
        } catch (e: any) {

            console.log(e.response.data.errors);
        } finally {
            setFormData({
                category: UsefulServiceCategory.ForAll,
                title: null,
                description: null,
                link: null,
                termsOfDisctribution: null,
                logoId: null,
            })
            setLoading(false);
        }
    };
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.closeButton} onClick={onClose}>
                    <Icon size={24} name={'close-md-black'} fill={'none'}></Icon>
                </div>
                <h3 className={styles.title}>{t("admin.usefulServices.modal.name" as any)}</h3>

                <Input
                    name="title"
                    width="100%"
                    label={t("admin.usefulServices.modal.title" as any)}
                    value={formData.title || ""}
                    onInput={handleChange}
                />
                <Input
                    name="link"
                    width="100%"
                    label={t("admin.usefulServices.modal.link" as any)}
                    value={formData.link || ""}
                    onInput={handleChange}
                />
                <DropdownInput
                    allowEmpty={false}
                    name="category"
                    width="100%"
                    label={t("admin.usefulServices.modal.type" as any)}
                    value={formData.category || UsefulServiceCategory.ForAll}
                    items={[UsefulServiceCategory.ForAll, UsefulServiceCategory.Students, UsefulServiceCategory.Employees]}
                    onChange={handleCategoryChange}
                />

                <Input
                    name="description"
                    width="100%"
                    label={t("admin.usefulServices.modal.description" as any)}
                    value={formData.description || ""}
                    onInput={handleChange}
                />

                <Input
                    name="termsOfDisctribution"
                    width="100%"
                    label={t("admin.usefulServices.modal.conditions" as any)}
                    value={formData.termsOfDisctribution || ""}
                    onInput={handleChange}
                />

                <div className={styles.buttons}>
                    <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                        {t("common.save" as any)}
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        {t("common.cancel" as any)}
                    </Button>
                </div>
            </div>
        </div>
    );
};

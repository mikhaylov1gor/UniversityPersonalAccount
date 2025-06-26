import React, {useMemo, useState} from 'react';
import Layout from '@/pages/layout/Layout';
import {useTranslation} from 'react-i18next';
import {UsefulServiceCategory} from '@/shared/models/enums/usefulServiceCategory';
import UsefulServicesAdminList from "@/features/admin/useful-services/UsefulServicesAdminList";
import Button from "@/shared/ui/atoms/Button/Button";
import {CreateUsefulServiceModal} from "@/features/admin/useful-services/CreateUsefulServiceModal";
import {UsefulServiceDto} from "@/shared/models/responses/usefulService/usefulServiceDto";

export const AdminUsefulServicesPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentServiceItem, setCurrentServiceItem] = useState<UsefulServiceDto | undefined>(undefined)
    const {t} = useTranslation();
    const categories = useMemo(
        () => [
            UsefulServiceCategory.Employees,
            UsefulServiceCategory.ForAll,
            UsefulServiceCategory.Students,
        ],
        []
    );

    const handleOpenEdit = (item: UsefulServiceDto) => {
        setCurrentServiceItem(item);
        setIsModalOpen(true);
    };

    const handleOpenCreate = () => {
        setCurrentServiceItem(undefined);
        setIsModalOpen(true);
    };

    return (
        <>
            <h2 style={{marginBottom: '1rem'}}>{t('titles.usefulServices' as any)}</h2>
            <div style={{marginBottom: '1rem'}}>
                <Button
                    variant="outline"
                    width={'100%'}
                    size={'sm'}
                    onClick={handleOpenCreate}>
                    {t("admin.usefulServices.addButton" as any)} ＋
                </Button>
            </div>
            <UsefulServicesAdminList
                categories={categories}
                onEdit={handleOpenEdit}
            />

            <CreateUsefulServiceModal
                isOpen={isModalOpen}
                service={currentServiceItem}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    setCurrentServiceItem(undefined);
                    window.location.reload();
                }}>
            </CreateUsefulServiceModal>
        </>
    );
};

export default AdminUsefulServicesPage;
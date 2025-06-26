import React, {useEffect, useState} from 'react';
import styles from './UsefulServiceCardAdmin.module.scss';
import {Row, Col} from 'react-grid-system';
import {Icon} from '@/shared/ui/atoms/Icon/Icon';
import defaultAvatar from '@/shared/assets/test/photo_profile.png';
import {UsefulServiceDto} from '@/shared/models/responses/usefulService/usefulServiceDto';
import {DeleteUsefulServiceModal} from "@/features/admin/useful-services/DeleteUsefulServiceModal";
import {useTranslation} from "react-i18next";
import {FilesStoreApi} from "@/shared/services/files.service.ts";

interface Props {
    item: UsefulServiceDto;
    onEdit?: (item: UsefulServiceDto) => void;
    onDelete: (item: UsefulServiceDto) => void;
}

const UsefulServiceAdminCard: React.FC<Props> = ({item, onEdit, onDelete}) => {
    const [expanded, setExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [url,setUrl] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const loadImage = async () => {
            if (item.logo.id){
                try {
                    const response = await FilesStoreApi.getFileById(item.logo.id);
                    const blob = new Blob([response.data], {
                        type: response.headers['content-type'] || 'image/jpeg'
                    });
                    const url = URL.createObjectURL(blob);
                    setUrl(url);
                } catch (e) {
                    console.error(`Ошибка загрузки лого сервиса ${item.id}`, e);
                }
            }
        };

        loadImage();
    }, []);

    return (
        <>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img
                        src={(url ?? defaultAvatar) as string}
                        alt={item.title || 'logo'}
                        className={styles.image}
                    />
                </div>

                <div className={styles.content}>
                    <Col style={{padding: 0, marginBottom: '20px'}}>
                        <div className={styles.title}>{item.title}</div>
                    </Col>
                    <Row align="start" justify="between" className={styles.headerRow}>
                        <Col xs={12} md={7} lg={6}>
                            <div className={styles.label}>{t("admin.usefulServices.modal.link" as any)}</div>
                            <div className={styles.valueLink}>{item.link}</div>
                        </Col>
                        <Col xs={12} md={2} lg={4}>
                            <div className={styles.label}>{t("admin.usefulServices.modal.type" as any)}</div>
                            <div className={styles.value}>{item.category}</div>
                        </Col>

                        <Col xs={12} md={3} lg={2}>
                            <div className={styles.actionIcons}>
                                <Icon
                                    name="edit-pencil-line01-black"
                                    size={24}
                                    style={{cursor: 'pointer'}}
                                    onClick={() => {
                                        onEdit?.(item)}
                                    }
                                    fill="none"
                                />
                                <Icon
                                    name="trash-full-black"
                                    size={24}
                                    style={{cursor: 'pointer', marginLeft: 8}}
                                    onClick={() => setIsModalOpen(true)}
                                    fill="none"
                                />
                            </div>
                        </Col>
                    </Row>

                    {expanded && (
                        <Row align="stretch" className={styles.expandedRow}>
                            <Col>
                                <div className={styles.separator}/>
                            </Col>
                        </Row>
                    )}


                    {expanded && (
                        <Row align="stretch" className={styles.expandedRow}>
                            <Col>
                                <div className={styles.label}>{t("admin.usefulServices.modal.description" as any)}</div>
                                <div className={styles.description}>{item.description}</div>
                                {item.termsOfDisctribution && (
                                    <>
                                        <div className={styles.separator}/>
                                        <div className={styles.label}>{t("admin.usefulServices.modal.conditions" as any)}</div>
                                    </>
                                )}
                                <div className={styles.conditions}>{item.termsOfDisctribution}</div>
                            </Col>
                        </Row>
                    )}

                    <Row justify="center" className={styles.toggleRow}>
                        <Icon
                            name={!expanded ? 'caret-down-md-black' : 'caret-up-md-black'}
                            size={24}
                            style={{cursor: 'pointer'}}
                            onClick={() => setExpanded(!expanded)}
                            fill="none"
                        />
                    </Row>
                </div>
            </div>
            <DeleteUsefulServiceModal serviceId={item.id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => onDelete} />
        </>
    );
};

export default UsefulServiceAdminCard;
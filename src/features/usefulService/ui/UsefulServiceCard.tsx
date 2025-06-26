import React, {useEffect, useState} from 'react';
import styles from './UsefulServiceCard.module.scss';
import { UsefulServiceDto } from '@/shared/models/responses/usefulService/usefulServiceDto';
import Button from '@/shared/ui/atoms/Button/Button';
import { useTranslation } from 'react-i18next';
import {FilesStoreApi} from "@/shared/services/files.service.ts";
import defaultPhoto from "@/shared/assets/test/default_event_photo.gif";

interface Props {
    service: UsefulServiceDto;
}

const ExternalLinkButton: React.FC = ({service}: Props) => {
    const { t } = useTranslation();
    return (
        <Button
            variant="primary"
            size="sm"
            iconRight="arrow-up-right-md-black"
            width="100%"
            onClick={() => window.open(service.link ?? '', '_blank')}
        >
            {t("admin.usefulServices.button" as any)}
        </Button>
    );
};

export const UsefulServiceCard: React.FC<Props> = ({ service }) => {
    const [logoUrl,setLogoUrl] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const loadImage = async () => {
            if (service.logo.id){
                try {
                    const response = await FilesStoreApi.getFileById(service.logo.id);
                    const blob = new Blob([response.data], {
                        type: response.headers['content-type'] || 'image/jpeg'
                    });
                    const url = URL.createObjectURL(blob);
                    setLogoUrl(url);
                } catch (e) {
                    console.error(`Ошибка загрузки лого сервиса ${service.id}`, e);
                }
            }
        };

        loadImage();
    }, []);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>{service.title}</h3>
                <div>
                    <ExternalLinkButton />
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.logoWrapper}>
                    <img
                        src={logoUrl || defaultPhoto as string}
                        alt={service.title}
                        className={styles.logo}
                    />
                </div>

                <h3 className={styles.titleMobile}>{service.title}</h3>

                <div className={styles.info}>
                    {service.description && (
                        <p className={styles.description}>
                            {service.description}
                        </p>
                    )}

                    {service.termsOfDisctribution && (
                        <>
                            <p className={styles.label}>
                                {t("admin.usefulServices.serviceTerms" as any)}
                            </p>
                            <p className={styles.terms}>
                                {service.termsOfDisctribution}
                            </p>
                        </>
                    )}
                </div>

                <div className={styles.footerBtn}>
                    <ExternalLinkButton />
                </div>
            </div>
        </div>
    );
};

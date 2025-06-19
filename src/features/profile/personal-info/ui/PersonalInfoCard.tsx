import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FilesStoreApi } from "@/shared/services/files.service.ts";
import styles from "./PersonalInfoCard.module.scss";

interface PersonalInfoCardProps {
    gender: string;
    birthDate: string;
    citizenship: string;
    snils: string;
    email: string;
    avatarId: string;
}

export function PersonalInfoCard({ gender, birthDate, citizenship, snils, email, avatarId }: PersonalInfoCardProps) {
    const { t } = useTranslation();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                setLoading(true);
                const response = await FilesStoreApi.getFileById(avatarId);
                const blob = new Blob([response.data], { type: response.headers['content-type'] || 'image/jpeg' });
                const url = URL.createObjectURL(blob);

                setAvatarUrl(url);
            } catch (error) {
                console.error("Avatar loading error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (avatarId) {
            loadAvatar();
        }
    }, [avatarId]);

    return (
        <div className={styles['personal-info-card']}>
            <div className={styles['personal-info-card__avatar-container']}>
                <img
                    src={avatarUrl ?? "src/shared/assets/test/photo_profile.png"}
                    alt="Photo"
                    className={styles['personal-info-card__avatar']}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "src/shared/assets/test/photo_profile.png";
                    }}
                />
            </div>

            <div className={styles['personal-info-card__content']}>
                <div className={styles['personal-info-card__header']}>
                    <h3 className={styles['personal-info-card__title']}>{t("profilePage.personalData.title")}</h3>
                </div>

                <div className={styles['personal-info-card__grid']}>
                    <div className={styles['personal-info-card__field']}>
                        <p2 className={styles['personal-info-card__field-label']}>{t("profilePage.personalData.gender")}</p2>
                        <p1 className={styles['personal-info-card__field-value']}>{gender}</p1>
                    </div>

                    <div className={styles['personal-info-card__field']}>
                        <p2 className={styles['personal-info-card__field-label']}>{t("profilePage.personalData.birthDate")}</p2>
                        <p1 className={styles['personal-info-card__field-value']}>{birthDate}</p1>
                    </div>

                    <div className={styles['personal-info-card__field']}>
                        <p2 className={styles['personal-info-card__field-label']}>{t("profilePage.personalData.citizenship")}</p2>
                        <p1 className={styles['personal-info-card__field-value']}>{citizenship}</p1>
                    </div>

                    <div className={styles['personal-info-card__field']}>
                        <p2 className={styles['personal-info-card__field-label']}>{t("profilePage.personalData.snils")}</p2>
                        <p1 className={styles['personal-info-card__field-value']}>{snils}</p1>
                    </div>

                    <div className={styles['personal-info-card__field']}>
                        <p2 className={styles['personal-info-card__field-label']}>{t("profilePage.personalData.email")}</p2>
                        <p1 className={styles['personal-info-card__field-value']}>{email}</p1>
                    </div>
                </div>
            </div>
        </div>
    );
}
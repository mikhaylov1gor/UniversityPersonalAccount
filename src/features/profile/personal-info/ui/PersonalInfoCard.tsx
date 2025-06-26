import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FilesStoreApi } from "@/shared/services/files.service.ts";
import styles from "./PersonalInfoCard.module.scss";
import defaultAvatar from '@/shared/assets/test/default_event_photo.gif';
import {UserStoreApi} from "@/shared/services/user.service.ts";
import {AvatarCropper} from "@/features/profile/avatar-cropper/ui/AvatarCropper.tsx";
import {ProfileStoreApi} from "@/shared/services/profile.service.ts";

interface PersonalInfoCardProps {
    userId: string,
    gender: string;
    birthDate: string;
    citizenship: string;
    snils: string;
    email: string;
    avatarId: string | null;
    isAdmin: boolean,
}

export function PersonalInfoCard({ userId, gender, birthDate, citizenship, snils, email, avatarId, isAdmin }: PersonalInfoCardProps) {
    const { t } = useTranslation();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [showCropper, setShowCropper] = useState(false);

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                const response = await FilesStoreApi.getFileById(avatarId);
                const blob = new Blob([response.data], {type: response.headers['content-type'] || 'image/jpeg'});
                const url = URL.createObjectURL(blob);

                setAvatarUrl(url);
                localStorage.setItem("avatarUrl", url);

            } catch (error) {
                console.error("Avatar loading error:", error);
            } finally {
            }
        };

        if (avatarId) {
            loadAvatar();
        }
    }, [avatarId]);

    // Кропы
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setShowCropper(true);
        };
        reader.readAsDataURL(file);
    };

    const handleCropComplete = async (croppedBlob: Blob) => {
        try {
            const fileDto = await FilesStoreApi.postFile(croppedBlob, 'avatar.jpg');
            const avatarId = fileDto.id;

            if (!isAdmin){
                await ProfileStoreApi.updateAvatar({fileId: avatarId})
            }
            else{
                await UserStoreApi.updateSpecificUserAvatarForAdmin(userId,{fileId: avatarId})
            }

            const url = URL.createObjectURL(croppedBlob);
            localStorage.setItem("avatarUrl", url)
            setAvatarUrl(url);
        } catch (error) {
            console.error("Ошибка при загрузке аватара", error);
        } finally {
            setShowCropper(false);
        }
    };


    if (loading) return <h1>Загрузка...</h1>;

    return (
        <div className={styles['personal-info-card']}>
            <div className={styles['personal-info-card__avatar-container']}>
                <label>
                    <img
                        src={avatarUrl || defaultAvatar as string}
                        alt="Photo"
                        className={styles['personal-info-card__avatar']}
                        style={{cursor: "pointer"}}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        style={{display: "none"}}
                        onChange={handleFileChange}
                    />
                </label>

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

            {/* Модалка кроппера */}
            {showCropper && imageSrc && (
                <AvatarCropper
                    imageSrc={imageSrc}
                    onCropComplete={handleCropComplete}
                    onClose={() => setShowCropper(false)}
                />
            )}

        </div>
    );
}
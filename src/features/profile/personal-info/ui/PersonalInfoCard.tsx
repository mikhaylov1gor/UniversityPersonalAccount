import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {FilesStoreApi} from "@/shared/services/files.service.ts";

interface PersonalInfoCardProps {
    gender: string;
    birthDate: string;
    citizenship: string;
    snils: string;
    email: string;
    avatarId: string;
}

export function PersonalInfoCard({gender, birthDate, citizenship, snils, email, avatarId}: PersonalInfoCardProps) {
    const {t} = useTranslation();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                setLoading(true);
                const response = await FilesStoreApi.getFileById(avatarId);
                console.log(response)
                const blob = new Blob([response.data], { type: response.headers['content-type'] || 'image/jpeg' });
                const url = URL.createObjectURL(blob);

                console.log(url);
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
        <>
            <div className="flex justify-center">
                <img
                    src={avatarUrl ?? "https://via.placeholder.com/500x400?text=Profile+Photo"}
                    alt="Photo"
                    className="w-full max-w-xs sm:max-w-md object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/500x400?text=Profile+Photo";
                    }}
                />
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">{t("profilePage.personalData.title")}</h2>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.personalData.gender")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">{gender}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.personalData.birthDate")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">{birthDate}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.personalData.citizenship")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">{citizenship}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.personalData.snils")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">{snils}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.personalData.email")}</p>
                        <p className="text-gray-900">{email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
import {useTranslation} from "react-i18next";

export function PersonalInfoCard(){
    const { t } = useTranslation();
    return (
        <>
            <div className="flex justify-center">
                <img
                    src="src/shared/assets/test/photo_profile.png"
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
                        <p className="pb-2 border-b border-gray-200 text-gray-900">Мужской</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.personalData.birthDate")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">15 января 1990</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.personalData.citizenship")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">Россия</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.personalData.snils")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">000 000 000 000</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.personalData.email")}</p>
                        <p className="text-gray-900">study@mail.ru</p>
                    </div>
                </div>
            </div>
        </>
    )
}
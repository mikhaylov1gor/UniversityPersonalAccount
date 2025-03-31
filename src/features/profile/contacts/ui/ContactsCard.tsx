import {useTranslation} from "react-i18next";

export function ContactsCard(){
    const { t } = useTranslation();
    return (
        <>
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">{t("profilePage.contacts.title")}</h2>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.contacts.phone")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">+7 123 123 12 12</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.contacts.phone2")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">+7 321 321 21 21</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.contacts.additionalEmail")}</p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">study1@email.com</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">{t("profilePage.contacts.address")}</p>
                        <p className="text-gray-900">г.Томск, ул. Колхозная, д.15</p>
                    </div>
                </div>
            </div>
        </>
    )
}
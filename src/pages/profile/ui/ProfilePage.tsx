import {useState} from "react";
import {useTranslation} from "react-i18next";

export function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'education' | 'work'>('education');
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-raleway text-2xl lg:text-3xl font-small ">Профиль</h2>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1 space-y-3">

                    <div className="lg:hidden md:hidden flex">
                        <h2 className="font-raleway text-2xl lg:text-3xl font-small ">Кузнецова Анна Георгиевна</h2>
                    </div>

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
                                <p className="text-gray-900">Мужской</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("profilePage.personalData.birthDate")}</p>
                                <p className="text-gray-900">15 января 1990</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("profilePage.personalData.citizenship")}</p>
                                <p className="text-gray-900">Россия</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("profilePage.personalData.snils")}</p>
                                <p className="text-gray-900">000 000 000 000</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("profilePage.personalData.email")}</p>
                                <p className="text-gray-900">stusy@mail.ru</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold text-gray-900">{t("profilePage.contacts.title")}</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                            <div>
                                <p className="text-sm text-gray-500">{t("profilePage.contacts.phone")}</p>
                                <p className="text-gray-900">+7 123 123 12 12</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("profilePage.contacts.phone2")}</p>
                                <p className="text-gray-900">+7 321 321 21 21</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("profilePage.contacts.additionalEmail")}</p>
                                <p className="text-gray-900">Россия</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t("profilePage.contacts.address")}</p>
                                <p className="text-gray-900">г.Томск, ул. Колхозная, д.15</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 space-y-3">
                    <div className="hidden md:block lg:block">
                        <h2 className="font-raleway text-2xl lg:text-3xl font-small">Кузнецова Анна Георгиевна</h2>
                    </div>

                    <div className="bg-white rounded-lg shadow p-2">
                        <div className="flex border-b border-gray-200 mb-6">
                            <button className={`py-2 px-4 font-medium 
                                    ${activeTab === 'education' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab('education')}>
                                {t("profilePage.tabs.education")}
                            </button>
                            <button className={`py-2 px-4 font-medium 
                                    ${activeTab === 'work' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab('work')}>
                                {t("profilePage.tabs.work")}
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'education' ? (
                                <div className="education-content">
                                    <h3 className="text-lg font-semibold mb-4">Моё образование</h3>
                                    <div className="space-y-4">
                                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                                            <h4 className="font-medium">МГУ им. Ломоносова</h4>
                                            <p className="text-gray-600">Факультет компьютерных наук</p>
                                            <p className="text-sm text-gray-500">2015 - 2019</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="work-content">
                                    <h3 className="text-lg font-semibold mb-4">Мой опыт работы</h3>
                                    <div className="space-y-4">
                                        <div className="border-l-4 border-blue-500 pl-4 py-2">
                                            <h4 className="font-medium">Frontend Developer в Яндекс</h4>
                                            <p className="text-gray-600">Разработка интерфейсов</p>
                                            <p className="text-sm text-gray-500">2020 - настоящее время</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

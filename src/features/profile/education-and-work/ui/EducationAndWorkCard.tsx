import {useState} from "react";
import {useTranslation} from "react-i18next";

export function EducationAndWorkCard(){
    const [activeTab, setActiveTab] = useState<'education' | 'work'>('education');
    const { t } = useTranslation();
    return (
        <>
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
        </>
    )
}
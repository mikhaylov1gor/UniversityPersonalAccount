import {EventParticipantDto} from "@/shared/models/responses/event/eventParticipantDto.ts";
import {useState} from "react";
import {EventParticipantType} from "@/shared/models/enums/event/eventParticipantType.ts";
import {useTranslation} from "react-i18next";
import {InnerParticipantsSection} from "@/features/admin/events/details/tabs/InnerParticipantsSection.tsx";
import {ExternalParticipantsSection} from "@/features/admin/events/details/tabs/ExternalParticipantsSection.tsx";


interface TabsProps{
    participants: EventParticipantDto[]
}
export function Tabs({ participants }: TabsProps) {
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState<EventParticipantType>(EventParticipantType.External)

    return (
        <>
                <div className="flex gap-4 py-1 mb-4">
                    <button
                        className={`py-2 px-4 font-medium
                                ${activeTab === EventParticipantType.Inner ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab(EventParticipantType.Inner)}
                    >
                        {t("events.details.inner")}
                    </button>
                    <button
                        className={`py-2 px-4 font-medium
                                ${activeTab === EventParticipantType.External ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab(EventParticipantType.External)}
                    >
                        {t("events.details.external")}
                    </button>
                </div>

                {activeTab === EventParticipantType.External && (
                    <ExternalParticipantsSection participants={participants}/>
                )}
                {activeTab === EventParticipantType.Inner && (
                    <InnerParticipantsSection participants={participants}/>
                )}
        </>
    );
}
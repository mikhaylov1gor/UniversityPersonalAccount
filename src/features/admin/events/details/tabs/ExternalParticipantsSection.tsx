import {EventParticipantDto} from "@/shared/models/responses/event/eventParticipantDto.ts";
import styles from "./ExternalParticipantsSection.module.scss";
import {EventParticipantType} from "@/shared/models/enums/event/eventParticipantType.ts";
import {useTranslation} from "react-i18next";

interface SectionProps{
    participants: EventParticipantDto[]
}
export function ExternalParticipantsSection({ participants }: SectionProps) {
    const {t} = useTranslation();
    const externalParticipants = participants.filter(
        (p) => p.participantType === EventParticipantType.External
    );

    if (!externalParticipants){
        return (<h1>Нет участников</h1>)
    }

    if (externalParticipants.length == 0) {
        return (
            <h4>Нет участников</h4>
        );
    }

    return (
        <div className={styles.wrapper}>
            {externalParticipants.map((participant, index) => (
                <div key={index} className={styles.participant}>
                    <div className={styles.info}>
                        <p
                            className={styles.name}>{participant.name}</p>
                        <div className={styles.infoText}>{participant.email}</div>
                        <div className={styles.infoText}>{participant.phone}</div>
                        {participant.additionalInfo !== null && (
                            <>
                                <div className={styles.infoText}>{t("events.details.additionalInfo" as any)}</div>
                                <div className={styles.name}>{participant.additionalInfo}</div>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
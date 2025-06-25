import {EventParticipantDto} from "@/shared/models/responses/event/eventParticipantDto.ts";
import {EventParticipantType} from "@/shared/models/enums/event/eventParticipantType.ts";
import styles from "@/features/admin/events/details/tabs/InnerParticipantsSection.module.scss";
import {useEffect, useState} from "react";
import {FilesStoreApi} from "@/shared/services/files.service.ts";
import defaultAvatar from '@/shared/assets/test/photo_profile.png';

interface SectionProps{
    participants: EventParticipantDto[],
}

interface AvatarMap {
    [userId: string]: string;
}

export function InnerParticipantsSection({ participants }: SectionProps) {
    const innerParticipants = participants.filter(
        (p) => p.participantType === EventParticipantType.Inner
    );

    const [avatarUrls, setAvatarUrls] = useState<AvatarMap>({});

    useEffect(() => {
        const fetchAvatars = async () => {
            const urls: AvatarMap = {};
            if (innerParticipants){
                for (const participant of innerParticipants) {
                    const fileId = participant.user?.avatar?.id;
                    const userId = participant.user?.id;
                    if (fileId && userId) {
                        try {
                            const res = await FilesStoreApi.getFileById(fileId);
                            const blob = new Blob([res.data], {
                                type: res.headers["content-type"] || "image/jpeg",
                            });
                            urls[userId] = URL.createObjectURL(blob);
                        } catch (e) {
                            console.error("Ошибка загрузки аватара", e);
                        }
                    }
                }
                setAvatarUrls(urls);
            }
        };

        fetchAvatars();

        return () => {
            Object.values(avatarUrls).forEach((url) => URL.revokeObjectURL(url));
        };
    }, []);

    if (innerParticipants.length == 0) {
        return (
            <h4>Нет участников</h4>
        );
    }
    return (
        <div className={styles.wrapper}>
            {innerParticipants.map((participant, index) => {
                const user = participant.user;
                const avatarUrl = user.avatar.id ? avatarUrls[user.id] : null;

                return (
                    <div key={index} className={styles.participant}>
                        <img
                            className={styles.avatar}
                            src={avatarUrl || defaultAvatar}
                            alt="avatar"
                        />
                        <div className={styles.info}>
                            <div className={styles.name}>
                                {user?.lastName} {user?.firstName} {user?.patronymic}
                            </div>
                            <div className={styles.email}>{participant.user.email}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
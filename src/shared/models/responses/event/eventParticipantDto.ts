import {UserShortDto} from "@/shared/api/models/responses/userShortDto.ts";
import {EventParticipantType} from "@/shared/models/enums/event/eventParticipantType.ts";

export interface EventParticipantDto{
    id: string,
    user: UserShortDto,
    email: string | null,
    name: string | null,
    phone: string | null,
    additionalInfo: string | null,
    participantType: EventParticipantType
}
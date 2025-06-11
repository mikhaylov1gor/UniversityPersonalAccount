import {FileDto} from "../fileDto.ts";
import {EventType} from "../../enums/event/eventType.ts";
import {EventFormat} from "../../enums/event/eventFormat.ts";
import {EventAuditory} from "../../enums/event/eventAuditory.ts";
import {EventStatus} from "@/shared/models/enums/event/eventStatus.ts";
import {UserShortDto} from "@/shared/api/models/responses/userShortDto.ts";
import {EventParticipantDto} from "@/shared/api/models/responses/event/eventParticipantDto.ts";

export interface EventDto{
    id: string;
    title: string | null,
    description: string | null,
    picture: FileDto,
    isTimeFromNeeded: boolean,
    dateTimeFrom: string | null,
    isTimeToNeeded: boolean,
    dateTimeTo: string | null,
    type: EventType,
    format: EventFormat,
    auditory: EventAuditory,
    status: EventStatus,
    link: string | null,
    addressName: string | null,
    latitude: number | null,
    longitude: number | null,
    isRegistrationRequired: boolean,
    registrationLastDate: string | null,
    isDigestNeeded: boolean,
    notificationText: string | null,
    digestText: string | null,
    author: UserShortDto,
    participants: EventParticipantDto[] | null,
}
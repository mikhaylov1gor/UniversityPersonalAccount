import {EventType} from "@/shared/models/enums/event/eventType.ts";
import {EventFormat} from "@/shared/models/enums/event/eventFormat.ts";
import {EventAuditory} from "@/shared/models/enums/event/eventAuditory.ts";

export interface EventEditDto{
    title: string | null,
    description: string | null,
    digestText: string | null,
    pictureId: string | null,
    isTimeFromNeeded: boolean,
    dateTimeFrom: string | null,
    isTimeToNeeded: boolean,
    dateTimeTo: string | null,
    link: string | null,
    addressName: string | null,
    latitude: number | null,
    longitude: number | null,
    isRegistrationRequired: boolean,
    registrationLastDate: string | null,
    isDigestNeeded: boolean,
    notificationText: string | null,
    type: EventType,
    format: EventFormat,
    auditory: EventAuditory
    id: string,
}
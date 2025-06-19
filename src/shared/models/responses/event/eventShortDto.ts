import {FileDto} from "@/shared/models/responses/fileDto.ts";
import {EventType} from "@/shared/models/enums/event/eventType.ts";
import {EventFormat} from "@/shared/models/enums/event/eventFormat.ts";
import {EventAuditory} from "@/shared/models/enums/event/eventAuditory.ts";
import {EventStatus} from "@/shared/models/enums/event/eventStatus.ts";

export interface EventShortDto{
    id: string,
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
    status: EventStatus
}
import {EventStatus} from "@/shared/models/enums/event/eventStatus.ts";

export interface EventEditStatusDto{
    id: string,
    newStatus: EventStatus
}
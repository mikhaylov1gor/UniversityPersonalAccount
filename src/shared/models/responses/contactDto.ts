import {ContactTypes} from "@/shared/models/enums/contactTypes.ts";

export interface ContactDto{
    value: string | null,
    type: ContactTypes
}
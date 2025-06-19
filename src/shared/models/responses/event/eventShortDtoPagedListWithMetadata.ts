import {EventShortDto} from "@/shared/models/responses/event/eventShortDto.ts";
import {PagedListMetaData} from "@/shared/models/responses/pagedListMetaData.ts";

export interface EventShortDtoPagedListWithMetadata{
    results: EventShortDto[] | null,
    metaData: PagedListMetaData
}
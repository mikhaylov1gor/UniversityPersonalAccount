import {EventShortDto} from "@/shared/api/models/responses/event/eventShortDto.ts";
import {PagedListMetaData} from "@/shared/api/models/responses/pagedListMetaData.ts";

export interface EventShortDtoPagedListWithMetadata{
    results: EventShortDto[] | null,
    metaData: PagedListMetaData
}
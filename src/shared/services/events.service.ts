import axiosInstance from '../api/axiosInstance';
import {eventsController} from "@/shared/api/endpoints.ts";
import {
    EventShortDtoPagedListWithMetadata
} from "@/shared/models/responses/event/eventShortDtoPagedListWithMetadata.ts";
import {EventDto} from "@/shared/models/responses/event/eventDto.ts";
import {EventInnerRegisterDto} from "@/shared/models/requests/event/eventInnerRegisterDto.ts";
import {EventExternalRegisterDto} from "@/shared/models/requests/event/eventExternalRegisterDto.ts";
import {EventStatus} from "@/shared/models/enums/event/eventStatus.ts";
import {EventType} from "@/shared/models/enums/event/eventType.ts";
import {EventFormat} from "@/shared/models/enums/event/eventFormat.ts";
import {EventCreateDto} from "@/shared/models/requests/event/eventCreateDto.ts";
import {EventEditDto} from "@/shared/models/requests/event/eventEditDto.ts";
import {EventEditStatusDto} from "@/shared/models/requests/event/eventEditStatusDto.ts";



export const EventsStoreApi = {
    getPublicEvents: async(name: string, eventDate: string,  timezoneOffset: number, page: number, pageSize: number) =>{
        const params = {
            name: name,
            eventDate: eventDate,
            timezoneOffset: timezoneOffset == null ? 420 : timezoneOffset,
            page: page == null ? 1 : page,
            pageSize: pageSize == null ? 5 : pageSize
        }
        let response = await axiosInstance.get<EventShortDtoPagedListWithMetadata>(`${eventsController}/public`, {params})
        return response.data;
    },

    getPublicEventsWithAuth: async(name: string, eventDate: string,  timezoneOffset: number, page: number, pageSize: number) =>{
        const params = {
            name: name,
            eventDate: eventDate,
            timezoneOffset: timezoneOffset == null ? 420 : timezoneOffset,
            page: page == null ? 1 : page,
            pageSize: pageSize == null ? 5 : pageSize
        }
        const response = await axiosInstance.get<EventShortDtoPagedListWithMetadata>(`${eventsController}/public/auth`, {params})
        return response.data;
    },

    getPublicEventDetails: async (id: string)=>{
        const response = await axiosInstance.get<EventDto>(`${eventsController}/public/${id}`)
        return response.data;
    },

    checkIsUserParticipantOfEvent: async (id: string)=>{
        const response = await axiosInstance.get(`${eventsController}/is_participant/${id}`)
        return response.data.isParticipating;
    },

    registerToEventAsInner: async (dto: EventInnerRegisterDto)=>{
        return await axiosInstance.post(`${eventsController}/register/inner`, dto,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    registerToEventAsExternal: async (dto: EventExternalRegisterDto)=>{
        return await axiosInstance.post(`${eventsController}/register/external`, dto, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    retrievesEventsForAdmin: async (status: EventStatus, eventType: EventType, name: string, format: EventFormat,
                                    eventDate: string, timezoneOffset: number, page: number, pageSize: number)=>{
        const params = {
            status: status,
            eventType: eventType,
            name: name,
            format: EventFormat,
            eventDate: eventDate,
            timezoneOffset: timezoneOffset == null ? 420 : timezoneOffset,
            page: page == null ? 1 : page,
            pageSize: pageSize == null ? 5 : pageSize
        }

        const data: EventShortDtoPagedListWithMetadata = await axiosInstance.get(`${eventsController}`, {params})
        return data;
    },

    createEventForAdmin: async (dto: EventCreateDto)=>{
        return await axiosInstance.post(`${eventsController}`, dto, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    editEventForAdmin: async (dto: EventEditDto)=>{
        return await axiosInstance.put(`${eventsController}`, dto, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    deleteEventByIdForAdmin: async (id: string)=>{
        const params ={
            id: id
        }
        return await axiosInstance.delete(`${eventsController}`, {params})
    },

    retrieveFullDetailsForAdmin: async (id: string)=>{
        const data: EventDto = await axiosInstance.get(`${eventsController}/${id}`)
        return data;
    },

    editEventStatusForAdmin: async (dto: EventEditStatusDto)=>{
        const data = await axiosInstance.put(`${eventsController}/status`, dto, {
            headers:{
                'Content-Type': 'application/json'
            }
        })

        return data;
    }
};
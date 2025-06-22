import axiosInstance from '../api/axiosInstance';
import {usefulServicesController} from "@/shared/api/endpoints.ts";
import {
    UsefulServiceDtoPagedListWithMetadata
} from "@/shared/models/responses/usefulService/usefulServiceDtoPagedListWithMetadata.ts";
import {UsefulServiceEditCreateDto} from "@/shared/models/requests/usefulServiceEditCreateDto.ts";
import {UsefulServiceCategory} from "@/shared/models/enums/usefulServiceCategory";

export const usefulServiceStoreApi = {
    getListByOfServices: async (categories: UsefulServiceCategory[] | null, page: number, pageSize: number) => {
        const params = new URLSearchParams();

        if (categories) {
            categories
                .map(c => UsefulServiceCategory[c])
                .forEach(str => params.append('categories', str));
        }

        params.append('page', String(page));
        params.append('pageSize', String(pageSize));

        const response = await axiosInstance.get<UsefulServiceDtoPagedListWithMetadata>(
            `${usefulServicesController}?${params.toString()}`
        );
        return response.data
    },

    createServiceForAdmin: async (dto: UsefulServiceEditCreateDto)=>{
        return await axiosInstance.post(`${usefulServicesController}`, dto, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    editServiceForAdmin: async (usefulServiceId: string, dto: UsefulServiceEditCreateDto)=>{
        return await axiosInstance.put(`${usefulServicesController}/${usefulServiceId}`, dto, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    deleteServiceForAdmin: async (usefulServiceId: string)=>{
        return await axiosInstance.delete(`${usefulServicesController}/${usefulServiceId}`)
    }
};
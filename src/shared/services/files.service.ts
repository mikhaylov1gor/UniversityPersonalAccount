import axiosInstance from '../api/axiosInstance';
import {filesController} from "@/shared/api/endpoints.ts";

export const FilesStoreApi = {
    getFileById: async (id: string)=>{
        return await axiosInstance.get(`${filesController}/${id}`, {
            responseType: 'arraybuffer',
        });
    },

    postFile: async (file: FormData)=>{
        return await axiosInstance.post(`${filesController}`, file)
    }
};
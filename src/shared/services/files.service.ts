import axiosInstance from '../api/axiosInstance';
import {filesController} from "@/shared/api/endpoints.ts";

export const FilesStoreApi = {
    getFileById: async (id: string)=>{
        let data = await axiosInstance.get(`${filesController}/${id}`);
        return data;
    },

    postFile: async (file: FormData)=>{
        return await axiosInstance.post(`${filesController}`, file)
    }
};
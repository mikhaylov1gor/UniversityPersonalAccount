import axiosInstance from '../api/axiosInstance';
import {profileController} from "@/shared/api/endpoints.ts";
import {ProfileDto} from "@/shared/models/responses/profile/profileDto.ts";
import {StudentDto} from "@/shared/models/responses/studentDto.ts";
import {EmployeeDto} from "@/shared/models/responses/employeeDto.ts";
import {AvatarUpdateDto} from "@/shared/models/requests/avatarUpdateDto.ts";

export const ProfileStoreApi = {
    getCurrentUserProfile: async () =>{
        const data: ProfileDto = await axiosInstance.get(`${profileController}`)
        return data;
    },

    getCurrentUserStudent: async () =>{
        const data: StudentDto = await axiosInstance.get(`${profileController}/student`)
        return data;
    },

    getCurrentUserEmployee: async () =>{
        const data: EmployeeDto = await axiosInstance.get(`${profileController}/employee`)
        return data;
    },

    updateAvatar: async (dto: AvatarUpdateDto) =>{
        return await axiosInstance.put(`${profileController}/avatar`, dto, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
};
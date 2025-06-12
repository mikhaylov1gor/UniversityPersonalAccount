import axiosInstance from '../api/axiosInstance';
import {userController} from "@/shared/api/endpoints.ts";
import {
    ProfileShortDtoPagedListWithMetadata
} from "@/shared/models/responses/profile/profileShortDtoPagedListWithMetadata.ts";
import {ProfileDto} from "@/shared/models/responses/profile/profileDto.ts";
import {ProfileUpdateDto} from "@/shared/models/requests/profileUpdateDto.ts";
import {StudentDto} from "@/shared/models/responses/studentDto.ts";
import {EmployeeDto} from "@/shared/models/responses/employeeDto.ts";
import {AvatarUpdateDto} from "@/shared/models/requests/avatarUpdateDto.ts";

export const UserStoreApi = {
    getProfilesForAdmin: async (email: string, name: string, filterLastName: string, page: number, pageSize: number)=>{
        const params = {
            email: email,
            name: name,
            filterLastName: filterLastName,
            page: page == null ? 1 : page,
            pageSize: pageSize == null ? 5 : pageSize,
        }

        const data: ProfileShortDtoPagedListWithMetadata = await axiosInstance.get(`${userController}/list`, {params});
        return data;
    },

    getSpecificUserProfileForAdmin: async (userId: string)=>{
        const data: ProfileDto = await axiosInstance.get(`${userController}/${userId}`);
        return data;
    },

    updateSpecificUserProfileForAdmin: async (userId: string, dto: ProfileUpdateDto)=>{
        return await axiosInstance.put(`${userController}/${userId}`, dto ,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    getSpecificUserStudentForAdmin: async (userId: string)=>{
        const data: StudentDto = await axiosInstance.get(`${userController}/${userId}/student`);
        return data;
    },

    getSpecificUserEmployeeForAdmin: async (userId: string)=>{
        const data: EmployeeDto = await axiosInstance.get(`${userController}/${userId}/employee`);
        return data;
    },

    updateSpecificUserAvatarForAdmin: async (userId: string, dto: AvatarUpdateDto)=>{
        return await axiosInstance.put(`${userController}/${userId}/avatar`, dto, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }
};
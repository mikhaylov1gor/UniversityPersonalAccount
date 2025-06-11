import axiosInstance from '../api/axiosInstance';
import {authController} from "@/shared/api/endpoints.ts";
import {LoginDto} from "@/shared/models/requests/loginDto.ts";
import {LoginResultDto} from "@/shared/models/responses/loginResultDto.ts";

export const AuthStoreApi = {
    login: async (credentials: LoginDto) =>{
        let data: LoginResultDto = await axiosInstance.post(`${authController}/login, credentials`);
        return data;
    },

    logout: async () =>{
        return await axiosInstance.post(`${authController}/logout`)
    },

    revokeTokens: async () =>{
        return await axiosInstance.post(`${authController}/revoke_all`)
    }
};
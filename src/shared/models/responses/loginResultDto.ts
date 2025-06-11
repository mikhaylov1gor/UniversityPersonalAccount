export interface LoginResultDto{
    accessToken: string | null,
    refreshToken: string | null,
    loginSucceeded: boolean,
}
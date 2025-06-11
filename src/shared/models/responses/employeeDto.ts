import {ExperienceDto} from "@/shared/api/models/responses/experienceDto.ts";
import {EmployeePostDto} from "@/shared/api/models/responses/employeePostDto.ts";

export interface EmployeeDto{
    id: string,
    experience: ExperienceDto[] | null,
    posts: EmployeePostDto[] | null,
}
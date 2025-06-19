import {ExperienceDto} from "@/shared/models/responses/experienceDto.ts";
import {EmployeePostDto} from "@/shared/models/responses/employeePostDto.ts";

export interface EmployeeDto{
    id: string,
    experience: ExperienceDto[] | null,
    posts: EmployeePostDto[] | null,
}
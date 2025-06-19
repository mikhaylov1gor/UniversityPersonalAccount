import {EmploymentTypes} from "@/shared/models/enums/employmentTypes.ts";
import {DepartmentDto} from "@/shared/models/responses/departmentDto.ts";
import {BaseDictionaryDto} from "@/shared/models/responses/baseDictionaryDto.ts";

export interface EmployeePostDto {
    id: string,
    rate: number,
    departments: DepartmentDto[] | null,
    postType: BaseDictionaryDto,
    postName: BaseDictionaryDto,
    dateStart: string | null,
    dateEnd: string | null,
    employmentType: EmploymentTypes
}
import {DepartmentDto} from "@/shared/api/models/responses/departmentDto.ts";
import {BaseDictionaryDto} from "@/shared/api/models/responses/baseDictionaryDto.ts";
import {EmploymentTypes} from "@/shared/models/enums/employmentTypes.ts";

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
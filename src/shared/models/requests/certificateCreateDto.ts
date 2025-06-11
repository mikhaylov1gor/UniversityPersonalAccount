import {CertificateType} from "@/shared/models/enums/certificate/certificateType.ts";
import {CertificateStaffType} from "@/shared/models/enums/certificate/certificateStaffType.ts";
import {CertificateUserType} from "@/shared/models/enums/certificate/certificateUserType.ts";
import {CertificateReceiveType} from "@/shared/models/enums/certificate/certificateReceiveType.ts";

export interface CertificateCreateDto{
    type: CertificateType,
    staffType: CertificateStaffType,
    userType: CertificateUserType,
    educationEntryId: string | null,
    employeePostId: string | null,
    receiveType: CertificateReceiveType
}
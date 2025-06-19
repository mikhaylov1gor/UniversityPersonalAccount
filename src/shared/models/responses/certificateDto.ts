import {CertificateStatus} from "@/shared/models/enums/certificate/certificateStatus.ts";
import {EnumDto} from "@/shared/models/responses/enumDto.ts";
import {CertificateType} from "@/shared/models/enums/certificate/certificateType.ts";
import {CertificateStaffType} from "@/shared/models/enums/certificate/certificateStaffType.ts";
import {CertificateUserType} from "@/shared/models/enums/certificate/certificateUserType.ts";
import {FileDto} from "@/shared/models/responses/fileDto.ts";
import {CertificateReceiveType} from "@/shared/models/enums/certificate/certificateReceiveType.ts";


export interface CertificateDto{
    id: string,
    status: CertificateStatus,
    statusEnumDto: EnumDto,
    type: CertificateType,
    staffType: CertificateStaffType,
    typeEnumDto: EnumDto,
    staffTypeEnumDto: EnumDto,
    userType: CertificateUserType,
    userTypeEnumDto: EnumDto,
    certificateFile: FileDto,
    signatureFile: FileDto,
    dateOfForming: string | null,
    receiveType: CertificateReceiveType,
    receiveTypeEnumDto: EnumDto,
}
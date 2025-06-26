import React, {useEffect, useState} from "react";
import {StudentDto} from "@/shared/models/responses/studentDto.ts";
import {EmployeeDto} from "@/shared/models/responses/employeeDto.ts";
import {ProfileStoreApi} from "@/shared/services/profile.service.ts";
import styles from "./CertificatesPage.module.scss";
import {useTranslation} from "react-i18next";
import DropdownInput from "@/shared/ui/atoms/DropdownInput/DropdownInput.tsx";
import {EducationEntryDto} from "@/shared/models/responses/educationEntryDto.ts";
import {Col, Row} from "react-grid-system";
import {CertificateType} from "@/shared/models/enums/certificate/certificateType.ts";
import {CertificateReceiveType} from "@/shared/models/enums/certificate/certificateReceiveType.ts";
import Button from "@/shared/ui/atoms/Button/Button.tsx";
import {CertificatesStoreApi} from "@/shared/services/certificates.service.ts";
import {CertificateDto} from "@/shared/models/responses/certificateDto.ts";
import {EmployeePostDto} from "@/shared/models/responses/employeePostDto.ts";
import {formatDepartments} from "@/features/profile/education-and-work/ui/WorkSection.tsx";
import {CertificateStaffType} from "@/shared/models/enums/certificate/certificateStaffType.ts";
import {CertificateCreateDto} from "@/shared/models/requests/certificateCreateDto.ts";
import {CertificateUserType} from "@/shared/models/enums/certificate/certificateUserType.ts";
import {toast} from "@/app/providers/Toast/ToastController.ts";
import {formatDateRange} from "@/features/events/main/ui/EventCard.tsx";
import {CertificateStatus} from "@/shared/models/enums/certificate/certificateStatus.ts";
import {Icon} from "@/shared/ui/atoms/Icon/Icon.tsx";
import {Download} from "lucide-react";
import {FilesStoreApi} from "@/shared/services/files.service.ts";

export function CertificatesPage() {
    const rolesJson = localStorage.getItem("roles");
    const roles: string[] = rolesJson ? JSON.parse(rolesJson) : [];
    const {t} = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [student, setStudent] = useState<StudentDto | null>(null);
    const [educations, setEducations] = useState<EducationEntryDto[] | []>([]);
    const [posts, setPosts] = useState<EmployeePostDto[] | []>([])
    const [employee, setEmployee] = useState<EmployeeDto | null>(null);
    const [role, setRole] = useState<string | null>(roles.length > 0 ? roles[0] : "admin");
    const [activeJobTab, setActiveJobTab] = useState<EmployeePostDto>(null);
    const [activeEducationTab, setActiveEducationTab] = useState<EducationEntryDto>(null);
    const [certificateType, setCertificateType] = useState<CertificateType | null>(null);
    const [certificateReceiveType, setCertificateReceiveType] = useState<CertificateReceiveType | null>(null);
    const [certificates, setCertificate] = useState<CertificateDto[] | []>([]);

    const fetchStudent = async () => {
        try {
            const data = await ProfileStoreApi.getCurrentUserStudent();
            setStudent(data);
            setEducations(data.educationEntries);
            if(data.educationEntries.length !== 0){
                setActiveEducationTab(data.educationEntries[0])
            }
            console.log("student", data)
        } catch (error) {
            console.log("Ошибка при получении student");
        } finally {
        }
    }
    const fetchEmployee = async () => {
        try {
            const data = await ProfileStoreApi.getCurrentUserEmployee();
            setEmployee(data);
            setPosts(data.posts);
            if(data.posts.length !== 0){
                setActiveJobTab(data.posts[0])
            }
            console.log("employee", data)
        } catch (error) {
            console.log("Ошибка при получении employee");
        } finally {
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    roles.includes("Student") && fetchStudent(),
                    roles.includes("Employee") && fetchEmployee()
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchCertificates = async () =>{
            try{
                setLoading(true);
                let id
                if (role == "Student"){
                    id = activeEducationTab.id
                }
                if (role == "Employee"){
                    id = activeJobTab.id
                }
                const data = await CertificatesStoreApi.getCurrentCertificates(role, id)
                console.log(data);
                setCertificate(data);
            }catch (error){

            }finally {
                setLoading(false)
            }
        }

        fetchCertificates();
    }, [activeJobTab, activeEducationTab]);

    const orderCertificate = async () =>{
        try{
            const dto: CertificateCreateDto = {
                type: certificateType,
                staffType: CertificateStaffType.ForPlaceOfWork,
                userType: role as CertificateUserType,
                educationEntryId: activeEducationTab?.id ?? null,
                employeePostId: activeJobTab?.id ?? null,
                receiveType: certificateReceiveType
            };

            await CertificatesStoreApi.createCertificate(dto);
            toast.success("Справка успешно заказана")
        } catch (err){}
            finally {
            window.location.reload();
        }
    }

    const download = async (id: string, fileName: string) => {
        try {
            const response = await FilesStoreApi.getFileById(id);
            const blob = new Blob([response.data], {
                type: response.headers['content-type'] || 'application/octet-stream'
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();

            URL.revokeObjectURL(url);
            toast.info("Скачивание скоро начнется...")
        } catch (error) {
            console.error("Ошибка при скачивании файла:", error);
        }
    }

    if (roles.length === 0) {
        return <div>Нет доступных ролей. Обратитесь к администратору.</div>;
    }

    if  (loading){
        return (
            <>
                <h1>{t("common.loading" as any)}</h1>
            </>)
    }
    return (
        <div>
            <div className={styles.header}>
                <h2>Заказ справки</h2>
            </div>

            <DropdownInput
                width="100%"
                label={t("admin.events.main.status" as any)}
                items={roles}
                allowEmpty={false}
                value={role}
                onChange={(value) => setRole(value as string)}
            />

            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className={styles.card}>
                    <div>
                        {role == "Student" ? (
                          <>
                              {educations.map((education, index) => (
                                  <button
                                      key={index}
                                      className={`px-4 py-2 ${activeEducationTab === education ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                      onClick={() => setActiveEducationTab(education)}
                                  >
                                      <div className={styles.tabContent}>
                                          <h3>{education.faculty?.name}</h3>
                                          <p className={styles.tabContent__p}>Уровень
                                              образования: {education.educationLevel.name}</p>
                                          <p className={styles.tabContent__p}>Статус: {education.educationStatus.name}</p>
                                      </div>
                                  </button>
                              ))}
                          </>
                        ) : (
                            <>
                                {posts.map((post, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 ${activeJobTab === post ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                        onClick={() => setActiveJobTab(post)}
                                    >
                                        <div className={styles.tabContent}>
                                            <h3>{post.postName?.name}</h3>
                                            <p className={styles.tabContent__p}> {post.employmentType}</p>
                                        </div>
                                    </button>
                                ))}
                            </>
                        )}
                    </div>

                    {role === "Student" && activeEducationTab && (
                        <>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>Уровень образования</div>
                                    <div className={styles.value}>{activeEducationTab.educationLevel.name}</div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label}>Статус</div>
                                    <div className={styles.value}>{activeEducationTab.educationStatus.name}</div>
                                </div>
                            </div>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>Факультет</div>
                                    <div className={styles.value}>{activeEducationTab.faculty.name}</div>
                                </div>
                            </div>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>Направление</div>
                                    <div className={styles.value}>{activeEducationTab.educationDirection.name}</div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label}>Группа</div>
                                    <div className={styles.value}>{activeEducationTab.group.name}</div>
                                </div>
                            </div>
                        </>
                    )}

                    {role === "Employee" && activeJobTab && (
                        <>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>Должность</div>
                                    <div className={styles.value}>{activeJobTab.postName.name}</div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label}>Ставка</div>
                                    <div className={styles.value}>{activeJobTab.rate}</div>
                                </div>
                            </div>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>Место работы</div>
                                    <div className={styles.value}>{formatDepartments(activeJobTab.departments)}</div>
                                </div>
                            </div>
                            <div className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>Тип должности</div>
                                    <div className={styles.value}>{activeJobTab.postType.name}</div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.label}>Вид занятости</div>
                                    <div className={styles.value}>{activeJobTab.employmentType}</div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className={styles.header}>
                        <h3>Заказать справку</h3>
                    </div>

                    <Row>
                        <Col md={6}>
                            <DropdownInput
                                width="100%"
                                label={t("admin.events.main.status" as any)}
                                items={Object.values(CertificateType)}
                                allowEmpty={true}
                                placeholder={"Не выбрано"}
                                value={certificateType}
                                onChange={(value) => setCertificateType(value as CertificateType)}
                            />
                        </Col>
                        <Col md={3}>
                            <DropdownInput
                                width="100%"
                                label={t("admin.events.main.status" as any)}
                                items={Object.values(CertificateReceiveType)}
                                allowEmpty={true}
                                placeholder={"Не выбрано"}
                                value={certificateReceiveType}
                                onChange={(value) => setCertificateReceiveType(value as CertificateReceiveType)}
                            />
                        </Col>
                        <Col sm={12} md={3}>
                            <Button
                                onClick={orderCertificate}
                            >
                                ЗАКАЗАТЬ СПРАВКУ
                            </Button>
                        </Col>
                    </Row>

                    <div style={{marginTop: '5px'}}>
                        {certificates.map((certificate, index) => (
                            <div className={styles.certificate}
                                key={index}
                            >
                                <div className={styles.tabContent}>
                                    <Row>
                                        <Col md={9}>
                                            <h4 style={{marginBottom: "0.4rem"}}>Справка
                                                от {formatDateRange(certificate.dateOfForming)}</h4>
                                            <p style={{marginBottom: "0.4rem"}} className={styles.tabContent__p}>Тип
                                                справки: {certificate.type}</p>
                                            <p className={styles.tabContent__p}>Вид
                                                справки: {certificate.receiveType}</p>
                                        </Col>
                                        <Col md={3} style={{ textAlign: "right", display: "flex", justifyContent: "flex-end"}}>
                                            {certificate.status == CertificateStatus.Created ? (
                                                <button className={styles.status__created}>
                                                    Создано
                                                </button>
                                            ) : certificate.status == CertificateStatus.InProcess ? (
                                                <button className={styles.status__inProcess}>
                                                    Заказано
                                                </button>
                                            ) : (
                                                <div className={styles.headerButtons}>
                                                    <button
                                                        onClick={() => download(certificate.signatureFile.id, certificate.signatureFile.name)}
                                                        className={styles.status__sign}>
                                                        <Download size={20} />
                                                        Подпись
                                                    </button>
                                                    <button
                                                        onClick={() => download(certificate.certificateFile.id, certificate.signatureFile.name)}
                                                        className={styles.status__certificate}>
                                                        <Download size={20} />
                                                        Справку
                                                    </button>

                                                    <button className={styles.status__ready}>
                                                        Готово
                                                    </button>
                                                </div>

                                            )}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
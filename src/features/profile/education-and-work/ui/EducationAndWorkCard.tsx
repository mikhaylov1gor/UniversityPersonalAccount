import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserType } from "@/shared/models/enums/userType";
import {StudentDto} from "@/shared/models/responses/studentDto.ts";
import {EmployeeDto} from "@/shared/models/responses/employeeDto.ts";
import {ProfileStoreApi} from "@/shared/services/profile.service.ts";
import {EducationSection} from "@/features/profile/education-and-work/ui/EducationSection.tsx";
import {WorkSection} from "@/features/profile/education-and-work/ui/WorkSection.tsx";
import {UserStoreApi} from "@/shared/services/user.service.ts";

interface EducationAndWorkCardProps {
    userId: string;
    userTypes: UserType[];
    isAdmin: boolean,
}

export function EducationAndWorkCard({ userId, userTypes, isAdmin }: EducationAndWorkCardProps) {
    const { t } = useTranslation();

    const hasStudent = userTypes.includes("Student");
    const hasEmployee = userTypes.includes("Employee");

    const [student, setStudent] = useState<StudentDto | null>(null);
    const [employee, setEmployee] = useState<EmployeeDto | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const [activeTab, setActiveTab] = useState<'education' | 'work'>(
        hasStudent ? 'education' : 'work'
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (!student && hasStudent) {
                    if (isAdmin){
                        const data = await UserStoreApi.getSpecificUserStudentForAdmin(userId);
                        console.log("Student Data: ",data);
                        setStudent(data);
                    }
                    else{
                        const data = await ProfileStoreApi.getCurrentUserStudent();
                        console.log("Student Data: ",data);
                        setStudent(data);
                    }

                }
                if (!employee && hasEmployee) {
                    if (isAdmin){
                        const data = await UserStoreApi.getSpecificUserEmployeeForAdmin(userId);
                        console.log("Employee Data: ",data);
                        setEmployee(data);
                    }
                    else{
                        const data = await ProfileStoreApi.getCurrentUserEmployee();
                        console.log("Employee Data: ",data);
                        setEmployee(data);
                    }
                }

            } catch (err) {
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, []);

    if (userTypes.length === 0){
        return <></>
    }
    else {
        return (
            <>
                <div className="bg-white rounded-lg shadow p-2">
                    <div className="flex gap-4 border-b mb-4">
                        {hasStudent && (
                            <button
                                className={`py-2 px-4 font-medium
                                ${activeTab === 'education' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('education')}
                            >
                                {t("profilePage.tabs.education")}
                            </button>
                        )}
                        {hasEmployee && (
                            <button
                                className={`py-2 px-4 font-medium
                                ${activeTab === 'work' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('work')}
                            >
                                {t("profilePage.tabs.work")}
                            </button>
                        )}
                    </div>

                    {activeTab === 'education' && hasStudent && !loading && (
                        <EducationSection student={student}/>
                    )}
                    {activeTab === 'work' && hasEmployee && !loading && (
                        <WorkSection employee={employee}/>
                    )}
                </div>
            </>
        );
    }
}
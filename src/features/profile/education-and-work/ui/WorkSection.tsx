import {useState} from "react";
import {Icon} from "@/shared/ui/atoms/Icon/Icon.tsx";
import {useTranslation} from "react-i18next";

import styles from "./TabSection.module.scss";
import {EmployeeDto} from "@/shared/models/responses/employeeDto.ts";

interface WorkSectionProps {
    employee: EmployeeDto
}

export function WorkSection({employee}: WorkSectionProps) {
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([0]);
    const [experienceTab, setExperienceTab] = useState<boolean>(true);
    const {t} = useTranslation();

    const toggle = (index: number) => {
        setExpandedIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    if (!employee.posts) {
        return (
            <>
                <h1>У вас нет опыта работы</h1>
            </>
        )
    }

    return (
        <div className={styles.entryList}>
            {/* Стаж */}
            <div className={styles.entry}>
                <div className={styles.header} onClick={() => setExperienceTab(!experienceTab)}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerInfo}>
                            <strong>{t("profilePage.tabs.workTab.experience")}</strong>
                            <Icon
                                name={experienceTab ? "caret-down-md-black" : "caret-up-md-black"}
                                size={30}
                                fill="none"
                                style={{ marginLeft: "auto" }}
                            />
                        </div>
                    </div>
                </div>

                {experienceTab && (
                    <div className={styles.entryBody}>
                        {employee.experience?.map((experience) => (
                            <div key={experience.id} className={styles.rowGroup}>
                                <div className={styles.row}>
                                    <div className={styles.label}>{experience.type}</div>
                                    <div className={styles.value}>
                                        {experience.years} years {experience.months} months
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Места работы */}
            {employee.posts.map((post, index) =>{
                const isOpen = expandedIndexes.includes(index);

                return (
                    <div key={post.id} className={styles.entry}>
                        <div className={styles.header} onClick={() => toggle(index)}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerInfo}>
                                    <strong>{post.postName.name}</strong>
                                    <Icon
                                        name={isOpen ? "caret-down-md-black" : "caret-up-md-black"}
                                        size={30}
                                        fill="none"
                                        style={{marginLeft: "auto"}}
                                    />
                                </div>
                            </div>
                        </div>

                        {isOpen && (
                            <div className={styles.entryBody}>
                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.workTab.employmentType")}</div>
                                        <div className={styles.value}>{post.employmentType}</div>
                                    </div>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.workTab.rate")}</div>
                                        <div className={styles.value}>{post.rate}</div>
                                    </div>
                                </div>

                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.workTab.workPlace")}</div>
                                        <div
                                            className={styles.value}>  {formatDepartments(post.departments)}</div>
                                    </div>
                                </div>

                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.workTab.workType")}</div>
                                        <div className={styles.value}>{post.postType.name}</div>
                                    </div>
                                </div>

                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.workTab.dateStart")}</div>
                                        <div className={styles.value}>{post.dateStart}</div>
                                    </div>

                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.workTab.dateEnd")}</div>
                                        <div className={styles.value}>{post.dateEnd}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                )
            })}
        </div>
    );
}

export const formatDepartments = (departments: Array<{name: string}> | undefined) => {
    if (!departments || departments.length === 0) {
        return t("profilePage.tabs.workTab.noDepartments");
    }
    return departments.map(dept => dept.name).join(', ');
};

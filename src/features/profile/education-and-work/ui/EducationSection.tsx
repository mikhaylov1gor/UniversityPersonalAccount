import {useState} from "react";
import {StudentDto} from "@/shared/models/responses/studentDto.ts";
import {Icon} from "@/shared/ui/atoms/Icon/Icon.tsx";
import {useTranslation} from "react-i18next";

import styles from "@/features/profile/education-and-work/ui/TabSection.module.scss";
interface EducationSectionProps {
    student: StudentDto
}

export function EducationSection({student} : EducationSectionProps) {
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([0]);
    const {t} = useTranslation();

    const toggle = (index: number) => {
        setExpandedIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    if (!student.educationEntries) {
        return (
            <>
                <h1>Студент еще не получал высшее образование</h1>
            </>
        )
    }

    return (
        <div className={styles.entryList}>
            {student.educationEntries.map((educationEntry, index) => {
                const isOpen = expandedIndexes.includes(index);

                return (
                    <div key={educationEntry.id} className={styles.entry}>
                        <div className={styles.header} onClick={() => toggle(index)}>

                            <div className={styles.headerContent}>
                                <div className={styles.headerInfo}>
                                    <h4><strong>{educationEntry.educationLevel?.name}</strong></h4>
                                </div>
                                <div className={styles.headerInfo}>
                                    <h4><strong>{educationEntry.educationStatus?.name}</strong></h4>
                                    <Icon
                                        name={isOpen ? "caret-down-md-black" : "caret-up-md-black"}
                                        size={30}
                                        fill="none"
                                        style={{ marginLeft: "auto" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {isOpen && (
                            <div className={styles.entryBody}>
                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.educationTab.educationYears")}</div>
                                        <div className={styles.value}>{educationEntry.educationYears?.name}</div>
                                    </div>

                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.educationTab.creditBookNumber")}</div>
                                        <div className={styles.value}>{educationEntry.creditBooknumber ?? "—"}</div>
                                    </div>
                                </div>

                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.educationTab.educationForm")}</div>
                                        <div className={styles.value}>{educationEntry.educationForm?.name}</div>
                                    </div>

                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.educationTab.educationBase")}</div>
                                        <div className={styles.value}>{educationEntry.educationBase?.name}</div>
                                    </div>
                                </div>

                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.educationTab.faculty")}</div>
                                        <div className={styles.value}>{educationEntry.faculty?.name}</div>
                                    </div>
                                </div>

                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.educationTab.educationDirection")}</div>
                                        <div className={styles.value}>{educationEntry.educationDirection?.name}</div>
                                    </div>
                                </div>


                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.educationTab.educationProfile")}</div>
                                        <div className={styles.value}>{educationEntry.educationProfile?.name}</div>
                                    </div>
                                </div>


                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.educationTab.course")}</div>
                                        <div className={styles.value}>{educationEntry.course ?? "—"}</div>
                                    </div>
                                </div>


                                <div className={styles.rowGroup}>
                                    <div className={styles.row}>
                                        <div
                                            className={styles.label}>{t("profilePage.tabs.educationTab.group")}</div>
                                        <div className={styles.value}>{educationEntry.group.name}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
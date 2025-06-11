import {useState} from "react";

interface EducationItem {
    degree: string;
    years: string;
    educationForm: string;
    faculty: string;
    direction: string;
    profile: string;
    course: number;

    status: string;
    recordBook: string;
    base: string;
    group: string;
}

export function EducationSection(){
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleItem = (id: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const educationData: EducationItem[] = [
        {
            id: 'bachelor',
            degree: 'Бакалавриат',
            university: 'МГУ им. Ломоносова',
            faculty: 'Факультет компьютерных наук',
            years: '2015 - 2019',
            group: 'БКЛ-162',
            course: '4 курс',
            recordBook: '12345678'
        },
        {
            id: 'master',
            degree: 'Магистратура',
            university: 'МГУ им. Ломоносова',
            faculty: 'Факультет компьютерных наук',
            years: '2019 - 2021',
            group: 'МКЛ-021',
            course: '2 курс',
            recordBook: '87654321'
        }
    ];
}
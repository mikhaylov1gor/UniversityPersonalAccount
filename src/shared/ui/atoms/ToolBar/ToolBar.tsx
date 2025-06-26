import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useTranslation} from "react-i18next";

const modules = {
    toolbar: [
        [{ font: [] }],
        ['bold', 'italic', 'underline'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'code-block'],
    ],
};

const formats = [
    'font',
    'bold', 'italic', 'underline',
    'align',
    'list', 'bullet',
    'link', 'code-block',
];

interface ToolBarProps {
    value: string;
    onChange: (value: string) => void;
}

export const ToolBar = ({ value, onChange }: ToolBarProps) => {
    const {t} = useTranslation()
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={t("common.enterText" as any)}
        />
    );
};
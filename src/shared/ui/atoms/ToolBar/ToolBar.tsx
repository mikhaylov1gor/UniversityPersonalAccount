import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useTranslation} from "react-i18next";

const modules = {
    toolbar: [
        [{ font: [] }],
        [{ color: [] }, { background: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean']
    ]
};

const formats = [
    'header',
    'font',
    'size',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'script',
    'list',
    'indent',
    'direction',
    'align',
    'link',
    'image',
    'video',
    'code-block',
    'clean'
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder="Введите текст..."
        />
    );
};
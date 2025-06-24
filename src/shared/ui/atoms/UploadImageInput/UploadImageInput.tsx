import React, {useRef, useState} from 'react';
import styles from './UploadImageInput.module.scss';
import { Icon } from '@/shared/ui/atoms/Icon/Icon';
import {useTranslation} from "react-i18next";

interface Props {
    onFileSelect: (file: File) => void;
}

export const UploadImageInput: React.FC<Props> = ({ onFileSelect }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {t} = useTranslation();
    const [fileName, setFileName] = useState<string | null>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
            setFileName(file.name)
        }
    };

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
            <div className={styles.content}>
                <Icon name="image-upload-black" size={24} fill={'none'}/>
                <span>{fileName ?? t("common.loadImage" as any)}</span>
            </div>
        </div>
    );
};

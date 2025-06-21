import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/features/profile/avatar-cropper/ui/CropUtils.ts';
import styles from '@/features/profile/avatar-cropper/ui/AvatarCropper.module.scss';

interface AvatarCropperProps {
    imageSrc: string;
    onCropComplete: (croppedBlob: Blob) => void;
    onClose: () => void;
}

export function AvatarCropper({ imageSrc, onCropComplete, onClose }: AvatarCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropCompleteInternal = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleDone = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onCropComplete(croppedImage);
    };

    return (
        <div className={styles.cropperWrapper}>
            <div className={styles.cropperContainer}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropCompleteInternal}
                />
            </div>

            <div className={styles.controls}>
                <button onClick={handleDone}>Сохранить</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
}

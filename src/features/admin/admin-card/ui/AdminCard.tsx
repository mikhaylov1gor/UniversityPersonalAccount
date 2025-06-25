import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminCard.module.scss';
import { Icon } from '@/shared/ui/atoms/Icon/Icon';

interface AdminCardProps {
    iconName: string;
    title: string;
    description: string;
    to: string;
}

export const AdminCard: React.FC<AdminCardProps> = ({
                                                        iconName,
                                                        title,
                                                        description,
                                                        to,
                                                    }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.titleIcon}>
                <div className={styles.card__icon}>
                    <Icon name={iconName} size={36} fill="none"/>
                </div>
                <h3>{title}</h3>
            </div>
            <p className={styles.card__description}>{description}</p>
        </div>
    );
};

export default AdminCard;

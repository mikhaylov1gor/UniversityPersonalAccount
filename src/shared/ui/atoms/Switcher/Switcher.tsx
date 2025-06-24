import styles from './Switcher.module.scss';
import React from 'react';

interface SwitcherProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOn: boolean;
    onToggle: () => void;
}

export const Switcher: React.FC<SwitcherProps> = ({
                                                      isOn,
                                                      onToggle,
                                                      ...props
                                                  }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            style={{
                backgroundColor: isOn ? '#2563eb' : '#e5e7eb',
                transition: 'background-color 0.3s ease',
            }}
            className={styles.switcher}
            {...props}
        >
            <span
                className={styles.span}
                style={{
                    left: isOn ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                }}
            />
        </button>
    );
};
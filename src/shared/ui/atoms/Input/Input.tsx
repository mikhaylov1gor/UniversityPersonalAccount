import React, {useRef} from 'react';
import styles from './Input.module.scss';
import {Icon} from '../Icon/Icon';

type State = 'default' | 'error' | 'disabled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    iconLeft?: string;
    iconLeftError?: string;
    iconRight?: string;
    iconRightError?: string;
    supportingText?: string;
    state?: State;
    width?: string | number;
}

export const Input: React.FC<InputProps> = ({
                                                label,
                                                iconLeft,
                                                iconRight,
                                                supportingText,
                                                state = 'default',
                                                disabled,
                                                width,
                                                value,
                                                onChange,
                                                ...rest
                                            }) => {
    const rootCls = [
        styles.root,
        state === 'error' && styles['root--error'],
        (disabled || state === 'disabled') && styles['root--disabled'],
    ]
        .filter(Boolean)
        .join(' ');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        if (disabled) return;
        // если контролируемый компонент (value + onChange)
        if (typeof onChange === 'function') {
            // создаём искусственное событие
            const ev = {
                target: {value: ''}
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(ev);
        } else if (inputRef.current) {
            // иначе просто чистим «неуправляемое» поле
            inputRef.current.value = '';
            // и триггерим native input event, чтобы parent-обработчики тоже сработали
            inputRef.current.dispatchEvent(new Event('input', {bubbles: true}));
        }
    };

    return (
        <div className={rootCls} style={{width: width ?? undefined}}>
            {label && <label className={styles.root__label}>{label}</label>}

            <div className={styles.root__control}>
                {iconLeft && (
                    <Icon
                        name={iconLeft}
                        size={20}
                        color={disabled ? undefined : undefined}
                        className={styles.root__icon}
                    />
                )}

                <input
                    ref={inputRef}
                    className={styles.root__input}
                    disabled={disabled}
                    value={value}
                    {...rest}
                />

                {iconRight && (
                    <button
                        type="button"
                        className={styles.root__clear}
                        onClick={handleClear}
                        tabIndex={-1}
                    >
                        <Icon
                            name={iconRight}
                            size={20}
                            className={styles.root__icon}
                            color={'#fff'}
                        />
                    </button>
                )}
            </div>

            {supportingText && (
                <div className={styles.root__support}>
                    {supportingText}
                </div>
            )}
        </div>
    );
};

export default Input;
import styles from './Button.module.scss';
import React from 'react';
import {Icon} from '../Icon/Icon';

type Variant = 'primary' | 'outline';
type Size = 'default' | 'sm';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    iconLeft?: string;
    iconRight?: string;
    width?: string | number
}

export const Button: React.FC<ButtonProps> = ({
                                                  variant = 'primary',
                                                  size = 'default',
                                                  iconLeft,
                                                  iconRight,
                                                  disabled,
                                                  style,
                                                  width,
                                                  children,
                                                  ...rest
                                              }) => {
    const classNames = [
        styles.root,
        styles[`root--${variant}`],
        size === 'sm' ? styles['root--sm'] : '',
        disabled ? styles['root--disabled'] : ''
    ].filter(Boolean).join(' ');

    const justifyContent =
        iconLeft && !iconRight ? 'flex-start' :
            iconRight && !iconLeft ? 'flex-end' :
                'center'


    const mergedStyle = {...style, maxWidth: width, width, justifyContent};

    return (
        <button className={classNames} disabled={disabled} style={mergedStyle} {...rest}>
            {iconLeft && <Icon name={iconLeft} size={24} className={styles.root__icon}/>}
            <span>{children}</span>
            {iconRight && <Icon name={iconRight} size={24} className={styles.root__icon}/>}
        </button>
    );
};

export default Button;
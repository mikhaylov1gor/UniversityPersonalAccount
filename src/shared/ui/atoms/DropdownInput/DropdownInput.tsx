
import React, {useState, useRef, useEffect} from 'react';
import styles from './DropdownInput.module.scss';
import {Input, InputProps} from '../Input/Input';
import {Icon} from '../Icon/Icon';

type Item = string | { label: string; value: string };

interface DropdownInputProps extends Omit<InputProps, 'value' | 'onChange' | 'iconRight'> {
    items: Item[];
    value: string;
    onChange: (value: any) => void;
    allowEmpty?: boolean;
    emptyOptionLabel?: string;
    getOptionLabel?: (item: Item) => string;
    getOptionValue?: (item: Item) => string;
}

export const DropdownInput: React.FC<DropdownInputProps> = ({
                                                                items,
                                                                value,
                                                                onChange,
                                                                allowEmpty = true,
                                                                emptyOptionLabel,
                                                                getOptionLabel = item => (typeof item === 'string' ? item : item.label),
                                                                getOptionValue = item => (typeof item === 'string' ? item : item.value),
                                                                placeholder,
                                                                disabled,
                                                                width,
                                                                ...rest
                                                            }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    const opts = items.map(item => ({
        value: getOptionValue(item),
        label: getOptionLabel(item),
    }));
    if (allowEmpty) {
        opts.unshift({
            value: '',
            label: emptyOptionLabel ?? placeholder ?? 'Не выбрано',
        });
    }

    const selectedItem = opts.find(o => o.value === value);
    const selectedLabel = selectedItem ? selectedItem.label : '';

    return (
        <div className={styles.root} ref={ref} style={{ width: width ?? '100%' }}>
            <div
                className={styles.inputWrapper}
                onClick={disabled ? undefined : () => setOpen(o => !o)}
            >
                <Input
                    {...rest}
                    placeholder={placeholder}
                    value={selectedLabel}
                    readOnly
                    disabled={disabled}
                    width={width ?? '100%'}
                />
                <Icon
                    name={open ? 'chevron-up-black' : 'chevron-down-black'}
                    size={18}
                    className={styles.arrowIcon}
                    fill = {'none'}
                />
            </div>

            {open && (
                <ul className={styles.list}>
                    {opts.map(opt => (
                        <li
                            key={opt.value}
                            className={styles.item}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownInput;

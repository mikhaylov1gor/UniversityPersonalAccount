import React from 'react';
import styles from '@/pages/admin/users/ui/UsersPage.module.scss';

const LETTERS = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ'.split('');

interface AlphabetFilterProps {
    activeLetter: string | null;
    onSelect: (letter: string) => void;
    onClear: () => void;
}

export function AlphabetFilter({ activeLetter, onSelect, onClear }: AlphabetFilterProps) {
    return (
        <div className={styles.alphabetFilter}>
            {LETTERS.map((letter) => (
                <button
                    key={letter}
                    className={activeLetter === letter ? styles.active : ''}
                    onClick={() => onSelect(letter)}
                    type="button"
                >
                    {letter}
                </button>
            ))}
            {activeLetter && (
                <button onClick={onClear} type="button" aria-label="Сбросить фильтр">
                    ×
                </button>
            )}
        </div>
    );
}

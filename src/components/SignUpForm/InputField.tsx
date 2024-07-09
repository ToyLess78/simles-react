import React from 'react';
import styles from './SignUpForm.module.css';

interface InputFieldProps {
    name: string;
    label: string;
    type: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = (
    {
        name,
        label,
        type,
        value,
        onChange,
        error,
        required = false,
    }) => {
    return (
        <div className={styles.field}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                className={styles.input}
                value={value}
                onChange={onChange}
                required={required}
            />
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default InputField;
import React, { useState } from 'react';
import styles from './SignUpForm.module.css';
import InputField from './InputField';

interface SignUpFormProps {
    isFullName?: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ isFullName = false }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const validateField = (name: string, value: string) => {
        switch (name) {
            case 'fullName':
                return validateFullName(value, isFullName);
            case 'email':
                return validateEmail(value);
            case 'password':
                return validatePassword(value);
            default:
                return '';
        }
    };

    const validateFullName = (value: string, isFullName: boolean) => {
        if (isFullName && !value) {
            return 'Full name is required.';
        }
        return '';
    };

    const validateEmail = (value: string) => {
        if (!value) {
            return 'Email is required.';
        }
        if (!/^\S+@\S+\.\S+$/.test(value)) {
            return 'Email is invalid.';
        }
        return '';
    };

    const validatePassword = (value: string) => {
        if (!value) {
            return 'Password is required.';
        }
        if (!/^.{3,20}$/.test(value)) {
            return 'Password must be between 3 and 20 characters.';
        }
        return '';
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const validateForm = () =>
        Object.keys(formData).reduce((acc, key) => {
            const error = validateField(key, formData[key as keyof typeof formData]);
            setErrors(prevErrors => ({
                ...prevErrors,
                [key]: error,
            }));
            return acc && !error;
        }, true);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateForm() && console.log('Form Data:', formData);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {isFullName && (
                <InputField
                    name="fullName"
                    label="Full Name"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    required={isFullName}
                />
            )}
            <InputField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
            />
            <InputField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                required
            />
            <button type="submit" className={styles.button}>
                Sign Up
            </button>
        </form>
    );
};

export default SignUpForm;

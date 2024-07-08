import React, { useState } from 'react';
import styles from './SignUpForm.module.css';

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
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

    const validateField = (name: string, value: string) =>
        name === 'fullName'
            ? !value
                ? 'Full name is required.'
                : ''
            : name === 'email'
                ? !value
                    ? 'Email is required.'
                    : !/^\S+@\S+\.\S+$/.test(value)
                        ? 'Email is invalid.'
                        : ''
                : name === 'password'
                    ? !value
                        ? 'Password is required.'
                        : !/^.{3,20}$/.test(value)
                            ? 'Password must be between 3 and 20 characters.'
                            : ''
                    : '';

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
        // Далі логіка для відправлення даних
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label htmlFor="fullName" className={styles.label}>
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={styles.input}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                />
                {errors.fullName && <div className={styles.error}>{errors.fullName}</div>}
            </div>
            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
            <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                {errors.password && <div className={styles.error}>{errors.password}</div>}
            </div>
            <button type="submit" className={styles.button}>
                Sign Up
            </button>
        </form>
    );
};

export default SignUpForm;

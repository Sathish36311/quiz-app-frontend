'use client';

import styles from '../styles/AuthForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        const form = event.target as HTMLFormElement;
        const username = (form.elements.namedItem('username') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 200) {
                const authToken = await response.json();
                localStorage.setItem('authToken', authToken.token);
                router.push('/home');
            } else {
                setError('Invalid username or password. Please try again.');
            }
        } catch {
            setError('Unexpected error occurred. Please try again later.');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const form = e.target as HTMLFormElement;
        const username = (form.elements.namedItem('username') as HTMLInputElement).value;
       .namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.status === 201) {
                setMode('login');
                form.reset();
            } else {
                setError('Registration failed');
            }
        } catch {
            setError('Unexpected error occurred. Please try again later.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                {mode === 'login' ? (
                    <>
                        <form className={styles.form} onSubmit={handleLogin}>
                            <h2>Login</h2>
                            <input type="text" name="username" placeholder="Username" required />
                            <input type="password" name="password" placeholder="Password" required />
                            <button className={styles.submit} type="submit">Login</button>
                            {error && <p className={styles.error}>{error}</p>}
                        </form>
                        <div className={styles.bottomText}>
                            <span>Don&apos;t have an account? </span>
                            <button type="button" className={styles.linkButton} onClick={() => setMode('register')}>
                                Register User
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <form className={styles.form} onSubmit={handleRegister}>
                            <h2>Register</h2>
                            <input type="text" name="username" placeholder="Username" required />
                            <input type="email" name="email" placeholder="Email" required />
                            <input type="password" name="password" placeholder="Password" required />
                            <button className={styles.submit} type="submit">Sign Up</button>
                            {error && <p className={styles.error}>{error}</p>}
                        </form>
                        <div className={styles.bottomText}>
                            <span>Already have an account? </span>
                            <button type="button" className={styles.linkButton} onClick={() => setMode('login')}>
                                Login
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

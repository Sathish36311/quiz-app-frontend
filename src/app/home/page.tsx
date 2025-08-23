'use client'
import { useRouter } from "next/navigation";
import styles from './HomePage.module.css';
import { useState } from "react";
import CreateQuizForm from "@/components/QuizForm";
import { QuizParams } from "@/types/quiz";
import { createQuiz, logout } from "@/lib/api";

export default function HomePage() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // on menu item click
    const onMenuItemClick = (action: string) => {
        if (action == 'history') router.push("/quiz/history")
        if (action == 'logout') logout();
    };


    // Backend call to generate quiz and proceed to take the quiz
    async function handleCreateQuiz(params: QuizParams) {
        try {
            const created = await createQuiz(params);
            alert(`Quiz created! ID: ${created.id}`)
            setShowModal(false);
            router.push(`/quiz/take?id=${created.id}`);
        } catch (error) {
            console.error("Quiz creation failed:", error);
            alert("Failed to create quiz. Please try again.");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.userMenu}>
                <button className={styles.userButton} onClick={() => setMenuOpen(o => !o)}>
                    <img src="/user-icon.png" alt="User menu" className={styles.userIcon} />
                </button>
                {menuOpen && (
                    <div className={styles.dropdown}>
                        <button onClick={() => { onMenuItemClick('history'); setMenuOpen(false); }}>History</button>
                        <button onClick={() => { onMenuItemClick('logout'); setMenuOpen(false); }}>Logout</button>
                    </div>
                )}
            </div>

            <div className={styles.welcomeSection}>
                <h1>Welcome to TeachEdison Quiz</h1>
                <button className={styles.createQuizBtn} onClick={() => setShowModal(true)}>Create Quiz</button>
            </div>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeBtn} onClick={() => setShowModal(false)}>×</button>
                        <CreateQuizForm onSubmit={handleCreateQuiz} />
                    </div>
                </div>
            )}

        </div>
    );
}
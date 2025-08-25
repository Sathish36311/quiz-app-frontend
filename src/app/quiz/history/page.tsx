'use client'

import { getUserQuizzes } from "@/lib/api";
import { Quiz } from "@/types/quiz"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './History.module.css'

export default function HistoryPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchQuizHistory() {
            try {
                const data = await getUserQuizzes();
                setQuizzes(data);
            } catch (error) {
                console.error('Failed to retrieve quiz history', error);
                alert('Unable to fetch quiz history');
            }
        }
        fetchQuizHistory();
    }, []);

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => router.back()}>Back</button>
            <h1 className={styles.title}>Your Quiz History</h1>
            {quizzes.length === 0 ? (<p className={styles.emptyState}>No Quizzes Found!!</p>) : (
                <div className={styles.tableWrap}>
                    <table className={styles.quizTable}>
                        <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Score</th>
                                <th>Questions</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map((quiz) => (
                                <tr key={quiz.id}>
                                    <td>{quiz.topic}</td>
                                    <td className={styles.num}>{quiz.score}</td>
                                    <td className={styles.num}>{quiz.number_of_questions}</td>
                                    <td>
                                        <button className={styles.takeQuizBtn} onClick={() => router.push(`/quiz/take/?id=${quiz.id}`)}>Take Quiz </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    )
}

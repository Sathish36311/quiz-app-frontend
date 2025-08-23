'use client';
import { getQuizById, saveQuizScore } from "@/lib/api";
import { OptionKey, Quiz } from "@/types/quiz";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './TakeQuiz.module.css'

export default function TakeQuizPage() {

    const searchParams = useSearchParams();
    const quizId = searchParams.get('id');
    const router = useRouter();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<Record<number, OptionKey>>({});
    const [score, setScore] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isReview, setIsReview] = useState<boolean>(false);


    const optionKeys: OptionKey[] = ['a', 'b', 'c', 'd'];
    type OptionField = 'option_a' | 'option_b' | 'option_c' | 'option_d';

    useEffect(() => {
        async function fetchQuiz() {
            if (!quizId) return;
            try {
                const response = await getQuizById(Number(quizId));
                setQuiz(response);
                resetStates();
            } catch (error) {
                console.error('Failed to retrieve quiz: ', error);
                alert('Quiz not found or failed to load.')
            } finally {
                setLoading(false)
            }
        }
        fetchQuiz();
    }, [quizId])

    if (loading) return <p>Loading Quiz....</p>
    if (!quiz) return <p>Quiz not found!...</p>

    const questions = quiz.questions || [];
    const currentQuestion = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;
    const allAnswered = questions.every(question => !!selected[question.id]);

    function getOptionText(q: Quiz['questions'][number], key: OptionKey) {
        const field = (`option_${key}`) as OptionField;
        return q[field];
    }

    function resetStates() {
        setCurrentIndex(0);
        setSelected({});
        setScore(null);
        setIsSubmitted(false);
        setIsReview(false);
    }


    function handleSelect(option: OptionKey) {
        setSelected((prev) => ({ ...prev, [currentQuestion.id]: option }));
    }


    function handlePrev() {
        setCurrentIndex(currentIndex - 1);
    }

    function handleNext() {
        setCurrentIndex(currentIndex + 1);
    }

    function computeScore() {
        let quizScore = 0;
        for (const question of questions) {
            if (selected[question.id] && selected[question.id] === question.correct_option) quizScore++;
        }
        return quizScore;
    }

    async function onSubmit() {
        // Calculate score and set in the state
        const finalScore = computeScore()
        try {
            if (quizId && finalScore != null) {
                await saveQuizScore(Number(quizId), finalScore);
                setScore(finalScore);
                setIsSubmitted(true);
            } else {
                alert('Quiz Id or score not found.')
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    }

    return (
        <main className={styles.page}>
            {isSubmitted && isReview ? (
                <>
                    <h1 className={styles.title}>Review: {quiz.topic}</h1>
                    <button className={styles.backBtn} onClick={() => setIsReview(false)}>
                        Back to Summary
                    </button>
                    <table className={styles.quizTable}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, idx) => {
                                const userChoice = selected[q.id];
                                return (
                                    <tr key={q.id}>
                                        <td className={styles.num}>{idx + 1}</td>
                                        <td>{q.text}</td>
                                        <td>
                                            {(['a', 'b', 'c', 'd'] as OptionKey[]).map((k) => {
                                                const label = getOptionText(q, k);
                                                const isCorrect = q.correct_option === k;
                                                const isUser = userChoice === k;
                                                return (
                                                    <div
                                                        key={k}
                                                        className={`${styles.optionItem} ${isCorrect ? styles.correct : isUser ? styles.userChoice : ''}`}
                                                    >
                                                        <strong>{k.toUpperCase()}.</strong>
                                                        <span className={styles.optionLabel}>{label}</span>
                                                        {isCorrect && <span className={styles.correctTag}>✔ Correct</span>}
                                                        {!isCorrect && isUser && <span className={styles.wrongTag}>✖ Your choice</span>}
                                                    </div>
                                                );
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className={styles.reviewPageButtons}>
                        <button className={styles.takeQuizBtn} onClick={resetStates}>Retake Quiz</button>
                        <button className={styles.takeQuizBtn} onClick={() => router.push('/home')}>Go Home</button>
                    </div>
                </>
            ) : isSubmitted ? (
                <>
                    <h1 className={styles.title}>Topic: {quiz.topic}</h1>
                    <h2 className={styles.title}>Summary</h2>
                    <p>Score: <strong>{score}</strong> / {questions.length}</p>
                    <div className={styles.buttonGroup}>
                        <button className={styles.takeQuizBtn} onClick={() => setIsReview(true)}>Review Answers</button>
                        <button className={styles.takeQuizBtn} onClick={resetStates}>Retake Quiz</button>
                    </div>
                </>
            ) : (
                <>
                    <button className={styles.backBtn} onClick={() => router.back()}>Back</button>
                    <h1 className={styles.title}>Topic: {quiz.topic}</h1>
                    <p>Progress: {currentIndex + 1} / {questions.length}</p>
                    <section className={styles.questionSection}>
                        <h2 className={styles.title}>{currentIndex + 1}. {currentQuestion.text}</h2>
                        {optionKeys.map(k => (
                            <label key={k} className={styles.optionLabelWrap}>
                                <input
                                    type="radio"
                                    name={`q-${currentQuestion.id}`}
                                    checked={selected[currentQuestion.id] === k}
                                    onChange={() => handleSelect(k)}
                                />
                                <strong>{k.toUpperCase()}.</strong>
                                <span className={styles.optionLabel}>{getOptionText(currentQuestion, k)}</span>
                            </label>
                        ))}
                    </section>
                    <div className={styles.buttonGroup}>
                        <button className={styles.takeQuizBtn} disabled={currentIndex === 0} onClick={handlePrev}>Previous</button>
                        {!isLast && (
                            <button className={styles.takeQuizBtn} disabled={currentIndex === questions.length - 1} onClick={handleNext}>Next</button>
                        )}
                        {isLast && (
                            <button className={styles.takeQuizBtn} onClick={onSubmit} disabled={!allAnswered}>Submit</button>
                        )}
                    </div>
                </>
            )}
        </main>

    );
}
'use client';

import { useState } from "react";
import type { Difficulty, Quiz, QuizParams } from "@/types/quiz";
import styles from "../styles/QuizForm.module.css";

type Props = {
    initial?: Partial<QuizParams>;
    onSubmit: (values: QuizParams) => Promise<void> | void;
}

type FormErrors = Partial<Record<'topic' | 'numQuestions', string>>

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']

export default function QuizForm({ initial, onSubmit }: Props) {

    // store initial value and update when required
    const [topic, setTopic] = useState(initial?.topic ?? '');
    const [numQuestions, setNumQuestions] = useState<number>(initial?.numQuestions ?? 5);
    const [difficulty, setDifficulty] = useState<Difficulty>(initial?.difficulty ?? 'easy');
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);

    /**
     * Method to validate the user inputs
     * @returns 
     */
    function validateInputs(): boolean {
        const e: FormErrors = {};
        if (!topic.trim()) e.topic = 'Please enter a topic.';
        if (numQuestions < 5 || numQuestions > 20) { e.numQuestions = 'Number of questions must be between 5 and 20.' }
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function onCreateQuizClick(event: React.FormEvent) {
        event.preventDefault();
        if (!validateInputs()) return;

        try {
            setSubmitting(true);
            await onSubmit({ topic: topic.trim(), numQuestions, difficulty });
            setTopic('')
            setNumQuestions(5)
            setDifficulty('easy')
            setErrors({})
        } catch (error) {
            console.log(error);
            alert('Failed to create quiz. Please try again.')
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={onCreateQuizClick} className={styles.form} method="post" aria-describedby="create-help">
            {/* Topic */}
            <div className={styles.field}>
                <label htmlFor="topic" className={styles.label}>Topic</label>
                <input id="topic" name="topic" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required maxLength={255} placeholder="e.g., JavaScript Arrays, World War II, Photosynthesis" className={styles.input} />
            </div>

            {/* Number of Questions */}
            <div className={styles.field}>
                <label htmlFor="number_of_questions" className={styles.label}> Number of Questions </label>
                <input id="number_of_questions" name="number_of_questions" value={numQuestions} type="number" onChange={(e) => setNumQuestions(Number(e.target.value))} min={5} max={20} required className={styles.number} aria-describedby="create-help" />
                <small id="create-help" className={styles.helper}>Choose between 5 and 20 questions.</small>
            </div>

            {/* Difficulty */}
            <fieldset className={`${styles.fieldset} ${styles.field}`}>
                <legend className={styles.legend}>Difficulty</legend>
                <div className={styles.radioRow}>
                    {DIFFICULTIES.map((level) => (
                        <label key={level} className={styles.radio}>
                            <input type="radio" name="difficulty" value={level} checked={difficulty === level} onChange={() => setDifficulty(level)} />
                            <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                        </label>
                    ))}
                </div>
            </fieldset>

            {/* Submit */}
            <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? 'Creating…' : 'Create Quiz'}
            </button>
        </form>
    );
}
export type Difficulty = 'easy' | 'medium' | 'hard';
export type OptionKey = 'a' | 'b' | 'c' | 'd';

export type QuizParams = {
    topic: string;
    numQuestions: number;
    difficulty: Difficulty;
}


export type Question = {
    id: number;
    text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: OptionKey
}

export type Quiz = {
    id: number;
    topic: string;
    difficulty: Difficulty;
    number_of_questions: number;
    created_at: string;
    completed: boolean;
    score: number;
    questions: Question[];
}


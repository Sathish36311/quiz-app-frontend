import type { Quiz, QuizParams } from "@/types/quiz";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function okOrThrow(response: Response) {
    if (!response.ok) {
        throw new Error(`API ${response.status} ${response.statusText}`)
    }
    return response.json();
}

export function logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/auth';
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = localStorage.getItem('authToken');
    if (!token) {
        logout();
        throw new Error('No token found. Logging out.');
    }
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        ...(options.headers || {})
    };
    const response = await fetch(url, {
        ...options,
        headers
    });
    if (response.status === 401) {
        logout();
        throw new Error('Unauthorized. Logging out.');
    }
    return response;
}

// function to create quiz
export async function createQuiz(params: QuizParams): Promise<Quiz> {
    const payload = { topic: params.topic, number_of_questions: params.numQuestions, difficulty: params.difficulty }
    const response = await fetchWithAuth(`${BASE_URL}/quiz/create`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    return okOrThrow(response)
}

// api call to get the quiz for the given id
export async function getQuizById(id: number): Promise<Quiz> {
    const response = await fetchWithAuth(`${BASE_URL}/quiz/take/${id}/`, {
        method: 'GET'
    });
    console.log(response);
    if (!response.ok) {
        throw new Error(`Failed to fetch quiz with ID ${id}`);
    }

    const data = await response.json();
    console.log(data);
    
    return data as Quiz;
}

export async function getUserQuizzes(): Promise<Quiz[]> {
    const response = await fetchWithAuth(`${BASE_URL}/quizzes/user/`, {
        method: 'GET'
    })

    console.log(response);
    
    if (!response.ok) {
        throw new Error(`Failed to retrieve Quiz History`)
    }

    const data = await response.json();
    console.log(data);
    
    return data as Quiz[];
}

export async function saveQuizScore(id: number, score: number): Promise<void> {
    const response = await fetchWithAuth(`${BASE_URL}/quiz/${id}/update-score`, {
        method: 'PATCH',
        body: JSON.stringify({
            score: score,
            completed: true
        })
    });

    if (!response.ok) {
        throw new Error('Failed to save score');
    }
}
import "@/public/questions.json";

export interface Question {
    id: string;
    question: string;
    answers: { [key: string]: string };
    correct: string[];
}

export interface Questions {
    [key: string]: Question[];
}

interface JsonData {
    questions: Questions;
}

export function loadJsonData(): JsonData {
    return JSON.parse(JSON.stringify(require('@/public/questions.json')));
}

const jsonData = loadJsonData();

export function getQuestions(rule: string): Question[] {
    return jsonData.questions[rule];
}

export function getRandomQuestions(rule: string[], amount: number): Question[] {
    let questions: Question[] = [];

    rule.forEach(rule => {
        questions = questions.concat(getQuestions(rule));
    });

    return questions.sort(() => Math.random() - Math.random()).slice(0, amount);
}
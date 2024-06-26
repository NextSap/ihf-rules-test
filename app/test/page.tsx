"use client"

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {getPreferredRulesLocalStorage, getQuestionsAmountLocalStorage, rules} from "@/lib/localstorage.utils";
import {getRandomQuestions, Question} from "@/lib/questions.utils";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

const Test = () => {

    const [preferredRules, setPreferredRules] = useState<{ [key: string]: boolean }>(rules);
    const [questionsAmount, setQuestionsAmount] = useState<number>(0);
    const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        setPreferredRules(getPreferredRulesLocalStorage());
        setQuestionsAmount(getQuestionsAmountLocalStorage());
        setRandomQuestions(getRandomQuestions(Object.keys(preferredRules).filter(rule => preferredRules[rule]), questionsAmount));
    }, [questionsAmount]);

    const handleCheckboxChange = (questionId: string, answerId: string) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: prevAnswers[questionId]
                ? prevAnswers[questionId].includes(answerId)
                    ? prevAnswers[questionId].filter(id => id !== answerId)
                    : [...prevAnswers[questionId], answerId]
                : [answerId]
        }));
    };

    const verifyAnswers = (privateUserAnswers: { [key: string]: string[] }) => {
        let score = 0;
        randomQuestions.forEach(question => {
            const selectedAnswers = privateUserAnswers[question.id] || [];
            const correctAnswers = Object.keys(question.answers).filter(answer => question.correct.includes(answer));
            const wrongAnswers = Object.keys(question.answers).filter(answer => !question.correct.includes(answer));
            if (selectedAnswers.length === correctAnswers.length && selectedAnswers.every(answer => correctAnswers.includes(answer)))
                score++;

            const cardElement = document.getElementById(question.id);
            if (cardElement) {
                if (selectedAnswers.some(answer => wrongAnswers.includes(answer)) || selectedAnswers.length !== correctAnswers.length) {
                    cardElement.classList.add('border-red-500');
                } else {
                    cardElement.classList.remove('border-red-500');
                }
            }
        });
        alert(`You answered correctly ${score} out of ${randomQuestions.length} questions.`);
    };

    return (
        <div className="flex flex-col gap-3 pt-5 m-auto w-[90%]">
            {randomQuestions.map((question) => {
                return (
                    <Card key={question.id} id={question.id}>
                        <CardHeader>
                            {question.question}
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-1">
                                {Object.keys(question.answers).map((answer, index) => {
                                    const uuid = question.id + index;
                                    return (
                                        <div key={uuid} className="">
                                            <Label className="flex gap-3.5 items-center p-3 border"
                                                   htmlFor={uuid}>
                                                <Checkbox id={uuid} name={uuid} value={answer}
                                                          onCheckedChange={() => handleCheckboxChange(question.id, answer)}/>
                                                {question.answers[answer]}
                                            </Label>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
            <Button className="w-full" onClick={() => verifyAnswers(userAnswers)}>Verify my test</Button>
        </div>
    );
};

export default Test;
export const rules: { [key: string]: boolean } = {
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
    "7": true,
    "8": true,
    "9": true,
    "10": true,
    "11": true,
    "12": true,
    "13": true,
    "14": true,
    "15": true,
    "16": true,
    "17": true,
    "18": true,
    "SAR": true
}

export const setPreferredRulesLocalStorage = (rules: { [key: string]: boolean }) => {
    localStorage.setItem('preferredRules', JSON.stringify(rules));
}

export const getPreferredRulesLocalStorage = (): { [key: string]: boolean } => {
    const preferredRules = localStorage.getItem('preferredRules');
    if (!preferredRules)
        return rules;

    return JSON.parse(preferredRules);
}

export const setQuestionsAmountLocalStorage = (amount: number) => {
    localStorage.setItem('questionsAmount', amount.toString());
}

export const getQuestionsAmountLocalStorage = (): number => {
    const questionsAmount = localStorage.getItem('questionsAmount');
    if (!questionsAmount)
        return 10;

    return parseInt(questionsAmount);
}
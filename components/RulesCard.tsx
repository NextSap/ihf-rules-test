"use client"

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {useRouter} from "next/navigation";

const rules = [
    "1. Playing court",
    "2. Playing Time, Final Signal and Time-Outs",
    "3. The Ball",
    "4. The Team, Substitution Area and Team Officials",
    "5. The Goalkeeper",
    "6. The Goal Area",
    "7. Playing the Ball, Passive Play",
    "8. Fouls and Unsportsmanlike Conduct",
    "9. Scoring",
    "10. The Throw-Off",
    "11. The Throw-In",
    "12. The Goalkeeper Throw",
    "13. The Free Throw",
    "14. The 7-Metre Throw",
    "15. General Instructions for the Execution of the Throws",
    "16. The Punishments",
    "17. The Referees",
    "18. The Timekeeper and the Scorekeeper",
    "SAR"
]

const RulesCard = () => {

    const router = useRouter();

    const [selectedRule, setSelectedRule] = useState<string>("");

    return (
        <Card>
            <CardHeader>
                <CardTitle>Train a specific rule</CardTitle>
                <CardDescription>Select the rule you want to train</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <Select onValueChange={(value) => setSelectedRule(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a rule"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Rules</SelectLabel>
                            {rules.map(rule => (
                                <SelectItem key={rule} value={rule}>{rule}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>
            <CardFooter>
                <Button onClick={() => {
                    if(selectedRule === "") return;
                    router.refresh();
                    router.push(`/train/${selectedRule.split(".")[0]}`);
                }}>Start training</Button>
            </CardFooter>
        </Card>
    );
};

export default RulesCard;
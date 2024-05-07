"use client"

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    getPreferredRulesLocalStorage,
    getQuestionsAmountLocalStorage, setPreferredRulesLocalStorage,
    setQuestionsAmountLocalStorage
} from "@/lib/localstorage.utils";
import {useRouter} from "next/navigation";

const TestCard = () => {

    const router = useRouter();

    const [preferredRules, setPreferredRules] = useState<{ [key: string]: boolean }>({});
    const [questionsAmount, setQuestionsAmount] = useState<number>();

    useEffect(() => {
        setPreferredRules(getPreferredRulesLocalStorage());
        setQuestionsAmount(getQuestionsAmountLocalStorage());
    }, []);

    const handleSwitchChange = (rule: string, newValue: boolean) => {
        setPreferredRules(prevRules => ({
            ...prevRules,
            [rule]: newValue
        }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Do a rules test</CardTitle>
                <CardDescription>Select the rules you want to train and an amount of questions</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="questionsAmount">Amount</Label>
                    <Input id="questionsAmount" type="number" min={1} step={1} defaultValue={questionsAmount}
                           onChange={(e) => {
                               const value = parseInt(e.target.value);
                               setQuestionsAmount(value);
                               setQuestionsAmountLocalStorage(value);
                           }}
                           className="w-16"/>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-36 mt-[20px]">Select the rules</Button>
                    </SheetTrigger>
                    <SheetContent className="flex flex-col gap-6" side={"left"}>
                        <Label className="text-xl">Select the rules</Label>
                        <div className="grid md:grid-rows-7 grid-flow-col gap-5 grid-rows-10">
                            {Object.keys(preferredRules).map((rule) => {
                                return (
                                    <div key={rule} className="flex items-center text-end">
                                        <Label className="w-8" htmlFor={rule}>{rule}</Label>
                                        <Switch id={rule} defaultChecked={preferredRules[rule]}
                                                onCheckedChange={(value) => handleSwitchChange(rule, value)}
                                                className="ml-3"/>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex gap-5">
                            <SheetClose asChild className="w-full">
                                <Button type="submit" onClick={() => {
                                    setPreferredRules(preferredRules);
                                    setPreferredRulesLocalStorage(preferredRules);
                                }}>Save</Button>
                            </SheetClose>
                            <SheetClose asChild className="w-full">
                                <Button>Cancel</Button>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </CardContent>
            <CardFooter>
                <Button onClick={() => router.push("test")}>Start test</Button>
            </CardFooter>
        </Card>
    );
};

export default TestCard;
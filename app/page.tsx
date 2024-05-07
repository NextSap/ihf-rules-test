import RulesCard from "@/components/RulesCard";
import TestCard from "@/components/TestCard";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col gap-10 md:w-[50%] w-[90%] m-auto mt-5">
            <div className="flex justify-center items-center w-full">
                <Image src="/IHF Logo.png" width={150} height={150} alt="IHF Logo"/>
            </div>
            <TestCard/>
            <RulesCard/>
        </div>
    );
}

import RulesCard from "@/components/RulesCard";
import TestCard from "@/components/TestCard";

export default function Home() {
    return (
        <div className="flex flex-col gap-10 md:w-[50%] w-[90%] m-auto mt-5">
            <TestCard/>
            <RulesCard/>
        </div>
    );
}

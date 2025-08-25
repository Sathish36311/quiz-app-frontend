"use client";

import { Suspense } from "react";
import TakeQuizPage from "./TakeQuizPage";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading Quiz...</p>}>
            <TakeQuizPage />
        </Suspense>
    );
}

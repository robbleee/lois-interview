"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Layers, GripVertical, CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";

interface MethodStep {
  id: number;
  correctStep: number;
  title: string;
  description: string;
}

const correctOrder: MethodStep[] = [
  {
    id: 1,
    correctStep: 1,
    title: "1. Project Overview",
    description: "Who is involved? Write down the vessel name, the location, the client company, and the job reference number. This is the cover page of the document.",
  },
  {
    id: 2,
    correctStep: 2,
    title: "2. Scope of Work",
    description: "State clearly what this job includes — and what it does NOT include. This prevents confusion and arguments later.",
  },
  {
    id: 3,
    correctStep: 3,
    title: "3. Roles and Responsibilities",
    description: "Who is in charge of what? List everyone involved — from the onshore Project Manager down to the ROV Supervisor (the person controlling the underwater robot) and the vessel Master (captain).",
  },
  {
    id: 4,
    correctStep: 4,
    title: "4. Risk Assessment",
    description: "What could go wrong? List the hazards (e.g. bad weather, equipment failure) and explain exactly how each one will be controlled. The risk assessment identifies the dangers; the method statement explains what you do about them.",
  },
  {
    id: 5,
    correctStep: 5,
    title: "5. Step-by-Step Task Plan",
    description: "A detailed list of every action, in order. For example: check systems → lower robot into water → dive to seabed → carry out inspection → bring robot back up → record results.",
  },
  {
    id: 6,
    correctStep: 6,
    title: "6. Emergency Procedures",
    description: "What happens if something goes wrong mid-operation? For example: if the robot's cable snaps, or a storm arrives suddenly, or comms are lost — who does what, and in what order?",
  },
];

const glossaryTerms = [
  {
    term: "IMR",
    fullForm: "Inspection, Maintenance, and Repair",
    plain: "The main service Reach Subsea provides — sending robots to check, fix, and maintain structures on the seabed. This is what most of their revenue comes from.",
  },
  {
    term: "ROV",
    fullForm: "Remotely Operated Vehicle",
    plain: "An underwater robot attached to the vessel by a long cable. It's controlled by a pilot on the ship (or from shore). It can carry cameras, tools, and sensors.",
  },
  {
    term: "DP",
    fullForm: "Dynamic Positioning",
    plain: "A computer system that uses the vessel's own engines to hold it perfectly still in one spot — even in strong currents — without needing to drop an anchor.",
  },
  {
    term: "SURF",
    fullForm: "Subsea Umbilicals, Risers, and Flowlines",
    plain: "The pipes and cables that connect an oil or gas well on the seabed up to a platform or ship on the surface. Reach Subsea often inspects and repairs these.",
  },
  {
    term: "Cessation of Production (CoP)",
    fullForm: "",
    plain: "When an oil or gas field stops being commercially viable and production is shut down permanently. This triggers decommissioning work — which is another growing market for Reach Subsea.",
  },
  {
    term: "FAT / SIT",
    fullForm: "Factory Acceptance Test / System Integration Test",
    plain: "Tests carried out on equipment before it's sent offshore. The idea is to find and fix problems on land where it's cheap and easy — not at sea where it costs a fortune and delays the whole project.",
  },
];

// Glossary quiz: show the plain definition, ask user to pick the correct term
const glossaryQuizItems = glossaryTerms.map((item, idx) => {
  const otherTerms = glossaryTerms
    .filter((_, i) => i !== idx)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(t => t.term);
  return {
    definition: item.plain,
    correct: item.term,
    options: [...otherTerms, item.term].sort(() => Math.random() - 0.5),
  };
});

export default function Module3() {
  const [items, setItems] = useState<MethodStep[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // Glossary quiz state
  const [glossaryMode, setGlossaryMode] = useState<"read" | "quiz">("read");
  const [gqIndex, setGqIndex] = useState(0);
  const [gqSelected, setGqSelected] = useState<string | null>(null);
  const [gqScore, setGqScore] = useState(0);
  const [gqDone, setGqDone] = useState(false);
  // Re-randomise options each quiz start
  const [quizItems, setQuizItems] = useState(glossaryQuizItems);

  const startGlossaryQuiz = () => {
    const freshItems = glossaryTerms.map((item, idx) => {
      const otherTerms = glossaryTerms
        .filter((_, i) => i !== idx)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(t => t.term);
      return {
        definition: item.plain,
        correct: item.term,
        options: [...otherTerms, item.term].sort(() => Math.random() - 0.5),
      };
    });
    setQuizItems(freshItems);
    setGqIndex(0);
    setGqSelected(null);
    setGqScore(0);
    setGqDone(false);
    setGlossaryMode("quiz");
  };

  const handleGqSelect = (option: string) => {
    if (gqSelected !== null) return;
    setGqSelected(option);
  };

  const handleGqNext = () => {
    if (gqSelected === quizItems[gqIndex].correct) setGqScore(s => s + 1);
    if (gqIndex + 1 >= quizItems.length) {
      setGqDone(true);
    } else {
      setGqIndex(i => i + 1);
      setGqSelected(null);
    }
  };

  const shuffle = () => {
    const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setIsSuccess(false);
  };

  useEffect(() => {
    shuffle();
  }, []);

  const checkOrder = (currentItems: MethodStep[]) => {
    const isCorrect = currentItems.every((item, index) => item.correctStep === index + 1);
    setIsSuccess(isCorrect);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("dragIndex", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("dragIndex"), 10);
    if (dragIndex === dropIndex) return;
    const newItems = [...items];
    const [dragged] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, dragged);
    setItems(newItems);
    checkOrder(newItems);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <p className="text-sm font-semibold text-subsea-600 tracking-wider uppercase">Step 3</p>
          <h1 className="text-3xl font-bold text-gray-900">Offshore Documents</h1>
        </div>
      </div>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <p className="text-gray-700 leading-relaxed text-lg mb-4">
          One of the first things you'll do in this job is help write and review <strong>method statements</strong>. 
          These are the official safety and planning documents that explain exactly how a piece of 
          offshore work will be done.
        </p>
        <p className="text-gray-700 leading-relaxed">
          You don't need to be an expert in these yet — but you do need to understand the structure 
          so you can talk about them confidently. If an interviewer says "walk me through how you'd 
          approach writing a method statement" — this section will prepare you for that.
        </p>
      </section>

      {/* Drag and Drop Game */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <Layers className="w-8 h-8 text-subsea-600" />
            <h2 className="text-2xl font-bold text-gray-900">Method Statement: Put It in Order</h2>
          </div>
          <button
            onClick={shuffle}
            className="flex items-center text-sm font-semibold text-subsea-600 border border-subsea-300 rounded-lg px-4 py-2 hover:bg-subsea-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Shuffle Again
          </button>
        </div>
        <p className="text-gray-700 max-w-3xl">
          Below are the 6 sections of an offshore method statement, but they're in the wrong order. 
          <strong> Drag and drop them into the correct sequence</strong> — the order that makes sense 
          logically before a piece of underwater work begins.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">Drag using the ≡ handle on the left of each row</p>
            {isSuccess && (
              <span className="flex items-center text-green-700 font-bold bg-green-50 border border-green-200 px-3 py-1 rounded-full text-sm">
                <CheckCircle2 className="w-5 h-5 mr-2" /> Correct!
              </span>
            )}
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`flex bg-white rounded-lg shadow-sm border p-4 items-start cursor-move transition-colors hover:border-subsea-300 ${
                  isSuccess ? "border-green-200" : "border-gray-200"
                }`}
              >
                <div className="mr-3 mt-1 text-gray-300 flex-shrink-0">
                  <GripVertical className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-subsea-600" />
            <h2 className="text-2xl font-bold text-gray-900">Key Terms — What They Actually Mean</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setGlossaryMode("read")}
              className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${glossaryMode === "read" ? "bg-subsea-600 text-white border-subsea-600" : "border-subsea-300 text-subsea-600 hover:bg-subsea-50"}`}
            >
              Read
            </button>
            <button
              onClick={startGlossaryQuiz}
              className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${glossaryMode === "quiz" ? "bg-subsea-600 text-white border-subsea-600" : "border-subsea-300 text-subsea-600 hover:bg-subsea-50"}`}
            >
              Test Me
            </button>
          </div>
        </div>

        {glossaryMode === "read" && (
          <>
            <p className="text-gray-700 max-w-3xl">
              The offshore industry is full of abbreviations and technical terms. 
              You'll sound much more confident if you use these naturally and correctly. Read through 
              them, then switch to <strong>Test Me</strong> to see how many you can recall.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {glossaryTerms.map((item, idx) => (
                <div key={idx} className="bg-white border-l-4 border-subsea-500 pl-5 pr-5 py-5 rounded-r-xl shadow-sm">
                  <div className="mb-2">
                    <span className="font-bold text-subsea-900 text-lg">{item.term}</span>
                    {item.fullForm && (
                      <span className="ml-2 text-sm text-gray-500">({item.fullForm})</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.plain}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {glossaryMode === "quiz" && !gqDone && (
          <div className="bg-subsea-50 rounded-xl border border-subsea-100 p-8">
            <p className="text-sm font-semibold text-subsea-600 uppercase tracking-wider mb-4">
              Term {gqIndex + 1} of {quizItems.length}
            </p>
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">What does this describe?</p>
              <p className="text-gray-900 leading-relaxed">{quizItems[gqIndex].definition}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {quizItems[gqIndex].options.map((opt) => {
                let style = "border-gray-200 bg-white hover:border-subsea-400 text-gray-900";
                if (gqSelected !== null) {
                  if (opt === quizItems[gqIndex].correct) style = "border-green-400 bg-green-50 text-green-900";
                  else if (opt === gqSelected) style = "border-red-400 bg-red-50 text-red-900";
                  else style = "border-gray-200 bg-white text-gray-400 opacity-50";
                }
                return (
                  <button
                    key={opt}
                    onClick={() => handleGqSelect(opt)}
                    disabled={gqSelected !== null}
                    className={`py-3 px-4 rounded-lg border-2 font-bold text-sm transition-all text-left ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {gqSelected !== null && (
              <div className={`flex items-start space-x-3 rounded-lg p-4 mb-5 ${gqSelected === quizItems[gqIndex].correct ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                {gqSelected === quizItems[gqIndex].correct
                  ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  : <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                }
                <p className="text-sm text-gray-800 leading-relaxed">
                  {gqSelected === quizItems[gqIndex].correct ? "Correct! " : `Not quite — the answer is ${quizItems[gqIndex].correct}. `}
                  {quizItems[gqIndex].definition}
                </p>
              </div>
            )}
            <button
              onClick={handleGqNext}
              disabled={gqSelected === null}
              className="bg-subsea-600 hover:bg-subsea-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-40"
            >
              {gqIndex + 1 >= quizItems.length ? "See My Score" : "Next Term →"}
            </button>
          </div>
        )}

        {glossaryMode === "quiz" && gqDone && (
          <div className="bg-subsea-50 rounded-xl border border-subsea-100 p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-subsea-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{gqScore} / {quizItems.length}</h3>
            <p className="text-gray-600 mb-6">
              {gqScore === quizItems.length
                ? "You know all of them. These will come across naturally in the interview."
                : gqScore >= 4
                ? "Good. Switch to Read mode to review the ones you got wrong."
                : "Go back to Read mode and spend a few more minutes on these — you'll use them constantly in this job."}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setGlossaryMode("read")}
                className="border border-subsea-500 text-subsea-600 font-semibold py-2 px-5 rounded-lg hover:bg-subsea-50 transition-colors"
              >
                Review Terms
              </button>
              <button
                onClick={startGlossaryQuiz}
                className="bg-subsea-600 hover:bg-subsea-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

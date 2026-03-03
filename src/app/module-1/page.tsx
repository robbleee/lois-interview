"use client";

import React, { useState } from "react";
import { Ship, MapPin, Wind, ArrowLeft, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

// USV = Uncrewed Surface Vessel — a boat with no crew, operated remotely from shore
// ROV = Remotely Operated Vehicle — an underwater robot on a cable
const vesselFacts = [
  {
    topic: "How big is the vessel?",
    fact: "23.9 metres long, 8 metres wide. That's roughly the size of a large motorhome/coach. Small enough to be quick and cheap to run.",
    whyItMatters: "Traditional survey ships can be 70+ metres long and cost far more. The smaller size means Reach Subsea can do the same work at a fraction of the cost — which is why clients choose them.",
  },
  {
    topic: "How long can it stay at sea?",
    fact: "At least 30 days without coming back to port. It runs on a hybrid system: two batteries (each 369 kWh) plus two diesel generators.",
    whyItMatters: "Staying out for a month means no expensive round trips to port. More time on the job equals more revenue for the company and better value for clients.",
  },
  {
    topic: "What underwater robot does it carry?",
    fact: "A Kystdesign ZEEROV — an electric Work Class ROV (underwater robot) that can dive to 2,000 metres depth. It connects to the vessel by a 1,065-metre cable (called an umbilical).",
    whyItMatters: "It's not just a camera drone. This robot can physically interact with things on the seabed — turning valves, taking readings, doing repairs.",
  },
  {
    topic: "How does it map the seabed?",
    fact: "It has sonar scanning tools built into its hull — a multibeam echosounder (maps the shape of the seabed), a sub-bottom profiler (sees under the seabed), and a positioning system.",
    whyItMatters: "This is where your Geophysics degree is directly relevant. You've used these types of tools. The vessel produces the same kind of data you studied.",
  },
  {
    topic: "How is it controlled with no crew on board?",
    fact: "Via satellite (Starlink, Iridium, VSAT), 5G, and radio links. A team in a Remote Operations Centre (ROC) on shore watches live cameras and instruments and controls the vessel.",
    whyItMatters: "The engineering workload is moving from ships to offices. A Project Engineer now sits on shore processing data and coordinating operations — not necessarily offshore.",
  },
];

const mod1Quiz = [
  {
    question: "What makes the Reach Remote vessels unusual compared to a normal survey ship?",
    options: [
      "They are nuclear powered",
      "They have no crew on board — they are controlled from an office on shore",
      "They can travel underwater",
      "They are made of carbon fibre",
    ],
    correct: 1,
    explanation: "Reach Remote 1 and 2 operate with zero crew on board. A team in a Remote Operations Centre on shore watches live camera feeds and controls everything.",
  },
  {
    question: "How deep can the underwater robot (ROV) on the Reach Remote dive?",
    options: ["500 metres", "1,000 metres", "2,000 metres", "5,000 metres"],
    correct: 2,
    explanation: "The ZEEROV robot can dive to 2,000 metres depth. The North Sea is typically 100–200 metres deep, so this gives a large safety margin.",
  },
  {
    question: "How long can the Reach Remote vessels stay at sea without coming back to port?",
    options: ["3 days", "7 days", "14 days", "At least 30 days"],
    correct: 3,
    explanation: "They have enough battery and fuel to stay out for at least 30 days. This dramatically reduces costs because port visits are expensive and time-consuming.",
  },
  {
    question: "How is the Reach Remote vessel controlled when it's at sea?",
    options: [
      "By a crew of 3 engineers on board",
      "By a pilot in a helicopter following it",
      "Via satellite and mobile links by a team in a shore-based control room",
      "It navigates automatically with no human input",
    ],
    correct: 2,
    explanation: "A team in a Remote Operations Centre (ROC) on shore controls the vessel using multiple communication links — Starlink, Iridium satellite, 5G and radio.",
  },
  {
    question: "Which part of Reach Subsea's work connects most directly to your Geophysics degree?",
    options: [
      "Building the ROV robots",
      "Carbon storage monitoring — using gravity sensors to check CO₂ stays underground",
      "Designing the vessel engines",
      "Writing commercial contracts",
    ],
    correct: 1,
    explanation: "Reach Subsea uses gravity monitoring and seabed analysis to track buried CO₂. This is Geophysics. You've studied these methods. Most engineering candidates haven't.",
  },
  {
    question: "What is the name of the overall project that the uncrewed vessels are part of?",
    options: ["Project Neptune", "Reach Remote", "Operation Subsea", "The ROC Initiative"],
    correct: 1,
    explanation: "Reach Remote is the name of the project. Reach Remote 1 and 2 were both delivered in 2025. You should be able to say this name confidently in the interview.",
  },
];

export default function Module1() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [showTable, setShowTable] = useState(false);

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const toggleCard = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSelect = (i: number) => {
    if (selected !== null) return; // already answered
    const newAnswers = [...answers, i];
    setAnswers(newAnswers);
    setSelected(i);
  };

  const handleNext = () => {
    if (selected === mod1Quiz[currentQ].correct) setScore(s => s + 1);
    if (currentQ + 1 >= mod1Quiz.length) {
      setQuizDone(true);
    } else {
      setCurrentQ(c => c + 1);
      setSelected(null);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setQuizDone(false);
    setAnswers([]);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <p className="text-sm font-semibold text-subsea-600 tracking-wider uppercase">Step 1</p>
          <h1 className="text-3xl font-bold text-gray-900">Know the Company</h1>
        </div>
      </div>

      {/* Plain intro */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <p className="text-gray-700 leading-relaxed text-lg mb-4">
          Interviewers can always tell when a candidate hasn't done their research. The goal here 
          is simple: by the time you walk into that room, you should be able to talk naturally about 
          what Reach Subsea does, what makes them different, and what their newest project is.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The most important thing to know about is their <strong>Reach Remote</strong> project — 
          two new boats (called USVs, or Uncrewed Surface Vessels) that operate with no crew on board, 
          controlled entirely from an office on shore. These are a big deal in the industry and you 
          should be able to explain them clearly.
        </p>
      </section>

      {/* The Reach Remote Vessel */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <Ship className="w-8 h-8 text-subsea-600" />
            <h2 className="text-2xl font-bold text-gray-900">The Reach Remote Vessels</h2>
          </div>
          <button
            onClick={() => setShowTable(!showTable)}
            className="text-sm font-semibold text-subsea-600 border border-subsea-300 rounded-lg px-4 py-2 hover:bg-subsea-50 transition-colors"
          >
            {showTable ? "Switch to Flashcards" : "View as Table"}
          </button>
        </div>
        <p className="text-gray-700">
          Reach Remote 1 and 2 were delivered in 2025. They are boats with no crew on board — operated 
          by a team watching from a shore office. Click each card below to learn the key facts and, 
          more importantly, <strong>why each fact matters</strong> for your interview answer.
        </p>

        {!showTable ? (
          <div className="grid md:grid-cols-2 gap-6">
            {vesselFacts.map((item, idx) => (
              <div
                key={idx}
                onClick={() => toggleCard(idx)}
                className="relative min-h-[200px] w-full cursor-pointer"
              >
                <div className={`w-full rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${flippedCards[idx] ? 'border-subsea-400 bg-subsea-50' : 'border-gray-200 bg-white hover:border-subsea-300'}`}>
                  {!flippedCards[idx] ? (
                    <div className="p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                      <RefreshCw className="w-5 h-5 text-gray-300 mb-3" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.topic}</h3>
                      <p className="text-sm text-gray-400">Click to see the answer</p>
                    </div>
                  ) : (
                    <div className="p-6 space-y-4 min-h-[200px]">
                      <div>
                        <h4 className="text-xs font-bold text-subsea-600 uppercase tracking-wider mb-1">The Fact</h4>
                        <p className="text-sm text-gray-900 font-medium leading-relaxed">{item.fact}</p>
                      </div>
                      <div className="pt-3 border-t border-subsea-200">
                        <h4 className="text-xs font-bold text-subsea-600 uppercase tracking-wider mb-1">Why It Matters in the Interview</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.whyItMatters}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-subsea-50">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-subsea-900">Topic</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-subsea-900">The Fact</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-subsea-900">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vesselFacts.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.topic}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.fact}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.whyItMatters}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Aberdeen office */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="w-6 h-6 text-subsea-600" />
            <h3 className="text-xl font-bold text-gray-900">The Aberdeen Office</h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            The office is in the <strong>H1 Building, Hill of Rubislaw</strong> in Aberdeen. 
            This is Reach Subsea's UK base for North Sea work.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Recent UK projects have included sending an underwater robot to inspect the protective 
            coating on an offshore oil platform — checking whether the anti-corrosion system was 
            still working properly.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>In your interview:</strong> Mention that you understand this office is the hub 
            for growing their North Sea business.
          </p>
        </section>

        {/* CCUS / Carbon */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-3 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-2">
            <Wind className="w-6 h-6 text-subsea-600" />
            <h3 className="text-xl font-bold text-gray-900">Carbon Storage Monitoring</h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            Reach Subsea also works on <strong>Carbon Capture and Storage (CCS)</strong> — which 
            means pumping CO₂ underground beneath the seabed to reduce atmospheric emissions.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            They use gravity sensors to monitor whether the stored CO₂ is staying in place over time.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>This is where your Geophysics degree is a direct advantage.</strong> Gravity 
            monitoring and seabed analysis is what you studied. Very few candidates will be able 
            to say that.
          </p>
        </section>
      </div>

      {/* Knowledge test */}
      <section className="bg-subsea-950 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Test Yourself</h2>
        <p className="text-subsea-100 mb-6">
          Now that you've read the flashcards and info sections, check how much has stuck. 
          6 questions — should take about 3 minutes.
        </p>

        {!quizStarted && !quizDone && (
          <button
            onClick={() => setQuizStarted(true)}
            className="bg-subsea-500 hover:bg-subsea-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Start the Test — 6 questions
          </button>
        )}

        {quizStarted && !quizDone && (
          <div>
            <p className="text-subsea-300 text-sm font-semibold mb-3 uppercase tracking-wider">
              Question {currentQ + 1} of {mod1Quiz.length}
            </p>
            <h3 className="text-xl font-bold mb-5">{mod1Quiz[currentQ].question}</h3>
            <div className="space-y-3 mb-5">
              {mod1Quiz[currentQ].options.map((opt, i) => {
                let style = "border-subsea-800 bg-subsea-900 hover:border-subsea-500";
                if (selected !== null) {
                  if (i === mod1Quiz[currentQ].correct) style = "border-green-400 bg-green-900/40";
                  else if (i === selected) style = "border-red-400 bg-red-900/40";
                  else style = "border-subsea-800 bg-subsea-900 opacity-50";
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className={`w-full text-left px-5 py-3 rounded-lg border-2 transition-all text-sm font-medium ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <div className="bg-subsea-800 rounded-lg p-4 mb-5 flex items-start space-x-3">
                {selected === mod1Quiz[currentQ].correct
                  ? <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                }
                <p className="text-subsea-100 text-sm leading-relaxed">{mod1Quiz[currentQ].explanation}</p>
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="bg-white text-subsea-900 font-semibold py-2 px-6 rounded-lg hover:bg-subsea-50 transition-colors disabled:opacity-40"
            >
              {currentQ + 1 >= mod1Quiz.length ? "See My Score" : "Next Question →"}
            </button>
          </div>
        )}

        {quizDone && (
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <CheckCircle2 className="w-10 h-10 text-subsea-400" />
              <div>
                <h3 className="text-2xl font-bold">
                  {score} / {mod1Quiz.length} correct
                </h3>
                <p className="text-subsea-200">
                  {score === mod1Quiz.length
                    ? "Perfect score. You know this company."
                    : score >= 4
                    ? "Good. Re-read the cards for the ones you got wrong, then you're ready."
                    : "Go back through the flashcards and try again — this knowledge is really important."}
                </p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              {mod1Quiz.map((q, i) => {
                const userAnswer = answers[i] ?? null;
                const correct = userAnswer === q.correct;
                return (
                  <div key={i} className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm ${correct ? "bg-green-900/30 border border-green-700" : "bg-red-900/30 border border-red-700"}`}>
                    {correct
                      ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    }
                    <span className="text-subsea-100">{q.question}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={resetQuiz} className="bg-subsea-500 hover:bg-subsea-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Try Again
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

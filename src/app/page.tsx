"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  ArrowLeftRight,
  FileText,
  GraduationCap,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  BookOpenText,
  Trophy,
} from "lucide-react";

const modules = [
  {
    title: "Know the Company",
    description: "Learn what Reach Subsea actually does, what makes them different, and what their new robots/vessels are called. You need to be able to talk about this confidently in the interview.",
    href: "/module-1",
    icon: Building2,
  },
  {
    title: "Your Skills, Reframed",
    description: "Your degree is in Geophysics and you run mountains — this module helps you explain how those things are actually really relevant to this engineering job. It's not obvious, but it is true.",
    href: "/module-2",
    icon: ArrowLeftRight,
  },
  {
    title: "Offshore Documents",
    description: "Engineers at this company write safety plans and operation documents. This module teaches you what those documents look like and lets you practise putting them in the right order.",
    href: "/module-3",
    icon: FileText,
  },
  {
    title: "Engineering Registration",
    description: "Reach Subsea will support you in becoming a Chartered Engineer. This sounds complicated because of the jargon, but this module breaks it down step by step and lets you write your goals.",
    href: "/module-4",
    icon: GraduationCap,
  },
  {
    title: "Practice Questions",
    description: "These are the actual questions they are likely to ask in the interview. Click each one to see how to structure your answer, and write out a practice response.",
    href: "/module-5",
    icon: MessageSquare,
  },
];

const quickQuiz = [
  {
    question: "What is Reach Subsea's core business?",
    options: [
      "Building oil rigs",
      "Underwater inspection, maintenance, and repair using robots and remote vessels",
      "Satellite communications",
      "Marine tourism",
    ],
    correct: 1,
    explanation: "Reach Subsea sends underwater robots (ROVs) to inspect and repair things on the seabed — like pipelines and structures on the ocean floor.",
  },
  {
    question: "What does USV stand for?",
    options: [
      "Underwater Surveillance Vehicle",
      "Uncrewed Surface Vessel — a boat with no crew on board, controlled remotely from shore",
      "Universal Safety Vessel",
      "Unmanned Subsea Vehicle",
    ],
    correct: 1,
    explanation: "USV = Uncrewed Surface Vessel. It's a boat that operates without any people on board, run by a team in a shore-based office.",
  },
  {
    question: "Where is the Reach Subsea office you would work in?",
    options: ["Oslo, Norway", "London, England", "Aberdeen, Scotland", "Bergen, Norway"],
    correct: 2,
    explanation: "The role is based at the H1 Building, Hill of Rubislaw, Aberdeen — the hub for their UK and North Sea operations.",
  },
  {
    question: "How long can the Reach Remote vessels stay at sea without returning to port?",
    options: ["7 days", "14 days", "At least 30 days", "6 months"],
    correct: 2,
    explanation: "They can stay out for at least 30 days. This is a big deal commercially — fewer port trips means more time working and more value for clients.",
  },
  {
    question: "What does ROV stand for?",
    options: [
      "Remote Offshore Vehicle",
      "Remotely Operated Vehicle — an underwater robot on a cable",
      "Rotating Ocean Vessel",
      "Radar-Operated Vision system",
    ],
    correct: 1,
    explanation: "ROV = Remotely Operated Vehicle. It's the underwater robot that the vessel deploys. It can go to 2,000 metres depth and physically interact with things on the seabed.",
  },
  {
    question: "Which part of Reach Subsea's work is your Geophysics degree most directly relevant to?",
    options: [
      "Crewing the vessels",
      "Building the ROVs",
      "Carbon storage monitoring using gravity sensors on the seabed",
      "Satellite communications",
    ],
    correct: 2,
    explanation: "Reach Subsea uses gravity monitoring and seabed analysis to check that stored CO₂ stays underground. That's exactly what you studied. Very few other candidates will be able to make that connection.",
  },
];

export default function Dashboard() {
  const [quizActive, setQuizActive] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const handleAnswer = (optionIdx: number) => {
    setSelected(optionIdx);
  };

  const handleNext = () => {
    if (selected === quickQuiz[currentQ].correct) {
      setScore(s => s + 1);
    }
    if (currentQ + 1 >= quickQuiz.length) {
      setQuizDone(true);
    } else {
      setCurrentQ(c => c + 1);
      setSelected(null);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setQuizDone(false);
    setQuizActive(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-subsea-950 mb-4">Interview Preparation</h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          This tool is built specifically to help you prepare for your interview at Reach Subsea.
          You have a strong background — you just need to learn how to explain it in the right way 
          for this job. Work through the five sections below in order.
        </p>
      </div>

      {/* Start here card */}
      <div className="bg-subsea-50 border border-subsea-200 rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-subsea-600 rounded-lg flex-shrink-0">
            <BookOpenText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">Start here if you know nothing about the company yet</h2>
            <p className="text-sm text-gray-600 mt-1">
              A plain-English page explaining who Reach Subsea is, what they do, their history, and why the Reach Remote project matters. Read this first before working through the steps below.
            </p>
          </div>
        </div>
        <Link
          href="/about"
          className="flex-shrink-0 inline-flex items-center bg-subsea-600 hover:bg-subsea-700 text-white font-semibold text-sm py-2.5 px-5 rounded-lg transition-colors"
        >
          Read the Overview <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {modules.map((mod, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-subsea-50 rounded-lg">
                <mod.icon className="w-6 h-6 text-subsea-600" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Step {index + 1}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{mod.title}</h3>
            <p className="text-gray-600 flex-grow mb-6 text-sm leading-relaxed">
              {mod.description}
            </p>
            <div className="mt-auto">
              <Link
                href={mod.href}
                className="inline-flex items-center text-sm font-semibold text-subsea-600 hover:text-subsea-800"
              >
                Go to this section <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Full quiz CTA */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-amber-500 rounded-lg flex-shrink-0">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">Once you've done the steps — take the Full Quiz</h2>
            <p className="text-sm text-gray-600 mt-1">
              30 tough multiple-choice questions covering the company, the vessels, industry terms, the role, and the values. 
              Get 80%+ and you're ready for the interview.
            </p>
          </div>
        </div>
        <Link
          href="/quiz"
          className="flex-shrink-0 inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-2.5 px-5 rounded-lg transition-colors"
        >
          Take the Full Quiz <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>

      {/* Quick-start quiz */}
      <div className="bg-subsea-950 rounded-xl text-white p-8 shadow-lg">
        {!quizActive && !quizDone && (
          <>
            <h2 className="text-2xl font-bold mb-3">Quick Check — Where Are You Starting From?</h2>
            <p className="text-subsea-100 mb-6 leading-relaxed max-w-2xl">
              Take this 3-question quiz to see how much you already know about Reach Subsea. 
              It only takes a minute and will help you know which section to focus on first.
            </p>
            <button
              onClick={() => setQuizActive(true)}
              className="bg-subsea-500 hover:bg-subsea-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Start the Quick Quiz — 6 questions
            </button>
          </>
        )}

        {quizActive && !quizDone && (
          <div>
            <p className="text-subsea-300 text-sm font-semibold mb-2 uppercase tracking-wider">
              Question {currentQ + 1} of {quickQuiz.length}
            </p>
            <h2 className="text-xl font-bold mb-6">{quickQuiz[currentQ].question}</h2>
            <div className="space-y-3 mb-6">
              {quickQuiz[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full text-left px-5 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    selected === i
                      ? "border-subsea-400 bg-subsea-800"
                      : "border-subsea-800 bg-subsea-900 hover:border-subsea-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {selected !== null && (
              <div className="bg-subsea-800 rounded-lg p-4 mb-5 text-sm">
                <p className={`font-bold mb-1 ${selected === quickQuiz[currentQ].correct ? "text-green-300" : "text-red-300"}`}>
                  {selected === quickQuiz[currentQ].correct ? "Correct!" : "Not quite."}
                </p>
                <p className="text-subsea-100">{quickQuiz[currentQ].explanation}</p>
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="bg-white text-subsea-900 font-semibold py-2 px-6 rounded-lg hover:bg-subsea-50 transition-colors disabled:opacity-40"
            >
              {currentQ + 1 >= quickQuiz.length ? "See My Score" : "Next Question"}
            </button>
          </div>
        )}

        {quizDone && (
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-subsea-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">You scored {score} out of {quickQuiz.length}</h2>
            <p className="text-subsea-100 mb-6">
              {score === quickQuiz.length
                ? "Excellent — you already know the key facts. Head straight to Step 2."
                : score >= 4
                ? "Strong start. Review any you got wrong in Step 1, then move on."
                : score >= 2
                ? "Good effort. Work through Step 1 carefully to fill in the gaps."
                : "Don't worry at all — that's exactly what Step 1 is for. Start there."}
            </p>
            <button onClick={resetQuiz} className="bg-subsea-500 hover:bg-subsea-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Reset Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

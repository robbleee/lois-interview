"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeft, Trophy, CheckCircle2, XCircle, RotateCcw, ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";

interface Question {
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const allQuestions: Question[] = [
  // --- THE COMPANY ---
  {
    category: "The Company",
    question: "What is the core service that Reach Subsea provides?",
    options: [
      "Building new offshore oil platforms",
      "Underwater inspection, maintenance, and repair of seabed infrastructure",
      "Designing and selling remotely operated vehicles",
      "Offshore catering and crew management",
    ],
    correct: 1,
    explanation: "Reach Subsea's core business is IMR — Inspection, Maintenance, and Repair. They send underwater robots to check and fix things on the seabed, like pipelines, platform legs, and subsea valves.",
  },
  {
    category: "The Company",
    question: "What was Reach Subsea's revenue in 2024 — their record year?",
    options: ["NOK 400 million", "NOK 1.1 billion", "NOK 2.7 billion", "NOK 5 billion"],
    correct: 2,
    explanation: "Reach Subsea reported record revenues of NOK 2,717.7 million (approximately NOK 2.7 billion) in 2024.",
  },
  {
    category: "The Company",
    question: "When was Reach Subsea founded?",
    options: ["1998", "2007", "2013", "2018"],
    correct: 2,
    explanation: "Reach Subsea was founded in 2013. Importantly, they have had zero major environmental spills since they started operations that year.",
  },
  {
    category: "The Company",
    question: "Which company builds the Reach Remote uncrewed vessels?",
    options: ["Rolls-Royce Marine", "Kongsberg Maritime", "Wartsila", "BAE Systems"],
    correct: 1,
    explanation: "The Reach Remote vessels are built by Kongsberg Maritime, a major Norwegian maritime technology company. Kongsberg also confirmed options for vessels 3 and 4 in 2025.",
  },
  {
    category: "The Company",
    question: "What is Reach Subsea's record on major environmental incidents since it began operations?",
    options: [
      "Two minor spills, one major incident",
      "One major spill in 2019",
      "Zero major spills",
      "Several incidents, all managed without public disclosure",
    ],
    correct: 2,
    explanation: "Reach Subsea has had zero major environmental spills since commencing offshore operations in 2013. This is a point of pride for them and shows their HSEQ (health, safety, environment, quality) culture is strong.",
  },
  {
    category: "The Company",
    question: "Where is the Reach Subsea office you would be working in?",
    options: [
      "Canary Wharf, London",
      "H1 Building, Hill of Rubislaw, Aberdeen",
      "Glasgow Science Park",
      "Norwegian Business Centre, Edinburgh",
    ],
    correct: 1,
    explanation: "The role is based at the H1 Building, Hill of Rubislaw, Aberdeen — Reach Subsea's UK hub for North Sea operations.",
  },

  // --- REACH REMOTE VESSELS ---
  {
    category: "Reach Remote Vessels",
    question: "What does USV stand for?",
    options: [
      "Underwater Surveillance Vehicle",
      "Unified Survey Vessel",
      "Uncrewed Surface Vessel",
      "Universal Subsea Vehicle",
    ],
    correct: 2,
    explanation: "USV = Uncrewed Surface Vessel. It is a boat that operates on the surface of the sea with no crew on board, controlled from a shore-based office.",
  },
  {
    category: "Reach Remote Vessels",
    question: "How long are the Reach Remote 1 and 2 vessels?",
    options: ["12 metres", "23.9 metres", "45 metres", "78 metres"],
    correct: 1,
    explanation: "The Reach Remote vessels are 23.9 metres rule length — roughly the size of a large coach or motorhome. This compact size keeps costs low compared to traditional 70+ metre survey ships.",
  },
  {
    category: "Reach Remote Vessels",
    question: "How long can the Reach Remote vessels stay at sea without returning to port?",
    options: ["5 days", "14 days", "At least 30 days", "90 days"],
    correct: 2,
    explanation: "The vessels have a minimum 30-day endurance. Hybrid batteries (2 x 369 kWh) and twin diesel generators (2 x 441 kW) power the vessel. Staying out longer means fewer expensive port visits.",
  },
  {
    category: "Reach Remote Vessels",
    question: "What is the name of the underwater robot (ROV) that the Reach Remote vessels carry?",
    options: ["Kystdesign ZEEROV", "Schilling HD ROV", "Triton LXT", "Saab Seaeye Panther"],
    correct: 0,
    explanation: "The ROV on the Reach Remote vessels is the Kystdesign ZEEROV — an electric Work Class ROV rated to 2,000 metres depth.",
  },
  {
    category: "Reach Remote Vessels",
    question: "How deep can the ROV (underwater robot) on the Reach Remote vessels dive?",
    options: ["200 metres", "500 metres", "1,000 metres", "2,000 metres"],
    correct: 3,
    explanation: "The ZEEROV can reach 2,000 metres depth. For context, most of the North Sea is only 100–200 metres deep — so this gives the vessel a large safety margin for deeper global operations too.",
  },
  {
    category: "Reach Remote Vessels",
    question: "How is a Reach Remote vessel controlled when it's out at sea?",
    options: [
      "By a small crew of 3 on board",
      "By a team in a Remote Operations Centre (ROC) on shore, via satellite and internet links",
      "It navigates automatically with no human input",
      "By a helicopter flying alongside it",
    ],
    correct: 1,
    explanation: "A team in a Remote Operations Centre (ROC) on shore controls the vessel using multiple communication links — including Starlink, Iridium satellite, VSAT, 5G, and radio.",
  },
  {
    category: "Reach Remote Vessels",
    question: "What emissions reduction do the Reach Remote vessels achieve compared to a traditional crewed survey vessel?",
    options: ["About 20%", "About 50%", "Up to 90%", "Exactly the same — they still use diesel"],
    correct: 2,
    explanation: "Reach Subsea targets up to 90% reduction in emissions compared to traditional crewed vessels. This is one of the main reasons clients choose them — it helps meet their own environmental targets.",
  },
  {
    category: "Reach Remote Vessels",
    question: "In late 2025, Reach Remote 1 received a historic permit. What did this permit allow?",
    options: [
      "Operating in international waters outside the EEZ",
      "Carrying a reduced crew of just two people",
      "Operating entirely without any support vessel nearby at all",
      "Diving to 3,000 metres depth",
    ],
    correct: 2,
    explanation: "The Norwegian Maritime Authorities, validated by DNV, issued a trading permit allowing Reach Remote 1 to operate entirely through remote operations with no support vessel nearby at all — the first time this had been approved.",
  },

  // --- INDUSTRY TERMS ---
  {
    category: "Industry Terms",
    question: "What does IMR stand for?",
    options: [
      "Integrated Marine Robotics",
      "Inspection, Maintenance, and Repair",
      "Internal Management Review",
      "Inertial Measurement Reference",
    ],
    correct: 1,
    explanation: "IMR = Inspection, Maintenance, and Repair. This is the core service Reach Subsea provides — sending robots to check, fix, and maintain structures on the seabed.",
  },
  {
    category: "Industry Terms",
    question: "What does ROV stand for?",
    options: [
      "Remotely Operated Vehicle",
      "Robotic Ocean Vehicle",
      "Remote Observation Vessel",
      "Ruggedised Offshore Vent",
    ],
    correct: 0,
    explanation: "ROV = Remotely Operated Vehicle. It's an underwater robot attached to the vessel by a cable (called an umbilical). It can carry cameras, sensors, and tools to physically interact with things on the seabed.",
  },
  {
    category: "Industry Terms",
    question: "What does DP stand for in offshore operations?",
    options: [
      "Depth Profile",
      "Directional Propulsion",
      "Dynamic Positioning",
      "Dual Power",
    ],
    correct: 2,
    explanation: "DP = Dynamic Positioning. It's a computer system that uses the vessel's own engines to hold it perfectly still in one spot — even in currents — without dropping an anchor.",
  },
  {
    category: "Industry Terms",
    question: "What does SURF stand for?",
    options: [
      "Subsea Umbilicals, Risers, and Flowlines",
      "Surface Underwater Recovery Framework",
      "Standard Undersea Routing Format",
      "Structural Underwater Reinforcement Frame",
    ],
    correct: 0,
    explanation: "SURF = Subsea Umbilicals, Risers, and Flowlines — the pipes and cables that connect a seabed well up to a platform or ship on the surface. Reach Subsea regularly inspects and repairs SURF.",
  },
  {
    category: "Industry Terms",
    question: "What does CoP (Cessation of Production) mean?",
    options: [
      "When a new oil field officially begins producing",
      "When an oil or gas field shuts down permanently because it's no longer economically viable",
      "When production is temporarily paused for maintenance",
      "A permit required before starting offshore work",
    ],
    correct: 1,
    explanation: "CoP = Cessation of Production — the point when a field stops producing permanently. This triggers decommissioning work (removing or securing the infrastructure), which is a growing revenue opportunity for Reach Subsea.",
  },
  {
    category: "Industry Terms",
    question: "What is a FAT?",
    options: [
      "A type of anchor used in shallow water",
      "A Factory Acceptance Test — tests done on equipment before it's shipped offshore",
      "A Fixed Asset Transfer — the handover of a vessel",
      "A Failure Analysis Template",
    ],
    correct: 1,
    explanation: "FAT = Factory Acceptance Test. Equipment is tested thoroughly on land before being sent offshore. The idea is to catch and fix problems while they're cheap to fix — not at sea where everything is expensive and risky.",
  },
  {
    category: "Industry Terms",
    question: "What does ROC stand for in the context of Reach Remote operations?",
    options: [
      "Remotely Operated Crane",
      "Regulatory Oversight Committee",
      "Remote Operations Centre — the shore-based control room",
      "Rotational Offshore Contract",
    ],
    correct: 2,
    explanation: "ROC = Remote Operations Centre. This is the shore-based control room where a team watches live feeds from the vessel and controls it remotely. This is where a Project Engineer would work.",
  },

  // --- THE ROLE ---
  {
    category: "The Role",
    question: "What is one of the first practical tasks a Graduate Project Engineer at Reach Subsea would work on?",
    options: [
      "Designing new ROV hardware",
      "Piloting the Reach Remote vessels",
      "Writing and reviewing method statements and task plans",
      "Negotiating client contracts independently",
    ],
    correct: 2,
    explanation: "The job description explicitly states that graduate engineers are expected to work towards writing method statements, task plans, procedures, and other documentation — ensuring clarity, consistency, and alignment with project standards.",
  },
  {
    category: "The Role",
    question: "What professional qualification does Reach Subsea support graduate engineers towards?",
    options: [
      "A Masters degree in Mechanical Engineering",
      "Chartered Engineer (CEng) status via the Institution of Mechanical Engineers (IMechE)",
      "A project management certification (PMP)",
      "A diving supervisor licence",
    ],
    correct: 1,
    explanation: "Reach Subsea has committed to supporting graduate engineers towards professional registration as a Chartered Engineer (CEng) with the Institution of Mechanical Engineers (IMechE).",
  },
  {
    category: "The Role",
    question: "What route to Chartered Engineer would someone with a Geophysics degree need to take?",
    options: [
      "They can't become a Chartered Engineer without an Engineering degree",
      "The standard accredited degree route",
      "The Academic Assessment route, where the IMechE reviews whether the degree provides sufficient scientific and technical knowledge",
      "They would need to complete a full Engineering degree first",
    ],
    correct: 2,
    explanation: "Because a Geophysics degree is not automatically accredited by the Engineering Council for IMechE purposes, the route is the Academic Assessment — where a panel reviews the degree content and work experience to check for sufficient technical underpinning.",
  },
  {
    category: "The Role",
    question: "What is the correct order for sections in an offshore method statement?",
    options: [
      "Emergency Procedures → Risk Assessment → Scope → Project Overview",
      "Project Overview → Scope → Roles → Risk Assessment → Task Plan → Emergency Procedures",
      "Task Plan → Roles → Risk Assessment → Scope → Emergency Procedures",
      "Scope → Task Plan → Risk Assessment → Project Overview → Emergency Procedures",
    ],
    correct: 1,
    explanation: "The correct order is: 1) Project Overview, 2) Scope of Work, 3) Roles and Responsibilities, 4) Risk Assessment, 5) Step-by-Step Task Plan, 6) Emergency Procedures. The logic flows from 'what is this?' to 'who does it?' to 'what could go wrong?' to 'what exactly happens?' to 'what if it goes wrong?'",
  },

  // --- VALUES ---
  {
    category: "Values",
    question: "Reach Subsea has three core values. Which one means 'share knowledge so no one is left behind'?",
    options: ["Learn", "Teach", "Reach", "Lead"],
    correct: 1,
    explanation: "'Teach' is about sharing knowledge and ensuring collective success. Reach Subsea explicitly says they expect more experienced employees to support those with less experience.",
  },
  {
    category: "Values",
    question: "A colleague is struggling with their first method statement. According to Reach Subsea's values, what should you do?",
    options: [
      "Let them figure it out — independence is important",
      "Tell your manager they're underperforming",
      "Sit with them, explain the structure, and help them get it right",
      "Complete it for them so the deadline isn't missed",
    ],
    correct: 2,
    explanation: "This is the 'Teach' value in action — helping someone understand rather than doing it for them (which doesn't help them grow) or ignoring them. The goal is their development, not just the immediate output.",
  },
  {
    category: "Values",
    question: "Which value is about continuously improving and seeking new insights — even when things are going well?",
    options: ["Reach", "Teach", "Learn", "Lead"],
    correct: 2,
    explanation: "'Learn' is about continuously searching for new knowledge and challenging established ways of doing things. It's not just about learning when you have to — it's a proactive mindset.",
  },

  // --- CARBON & RENEWABLES ---
  {
    category: "Carbon & Renewables",
    question: "What does CCUS stand for?",
    options: [
      "Cable and Conduit Underwater Systems",
      "Carbon Capture, Utilisation, and Storage",
      "Certified Clean Undersea Survey",
      "Continental Coastal Underwater Scanning",
    ],
    correct: 1,
    explanation: "CCUS = Carbon Capture, Utilisation, and Storage. It involves capturing CO₂ and storing it permanently underground — often beneath the seabed. Reach Subsea monitors these storage sites to check the CO₂ stays where it should.",
  },
  {
    category: "Carbon & Renewables",
    question: "What monitoring technique does Reach Subsea use to track CO₂ stored beneath the seabed?",
    options: [
      "Underwater microphones",
      "4D gravity monitoring using seafloor sensors",
      "Satellite thermal imaging",
      "Water temperature profiling",
    ],
    correct: 1,
    explanation: "Reach Subsea uses 4D gravity monitoring (branded gWatch) to detect changes in the density of material below the seabed — which reveals whether stored CO₂ is moving or staying in place. This directly connects to Geophysics training.",
  },
  {
    category: "Carbon & Renewables",
    question: "Why is the CCUS work particularly relevant for a Geophysics graduate?",
    options: [
      "It isn't — it requires mechanical engineering skills",
      "Gravity monitoring and seabed analysis are standard tools in Geophysics — you've studied these",
      "CCUS work only involves legal and commercial skills",
      "It requires offshore diving certification first",
    ],
    correct: 1,
    explanation: "Gravity surveys, seismic monitoring, and subsurface analysis are core Geophysics skills. Very few candidates with other backgrounds can make this direct connection. It's a genuine competitive advantage.",
  },
];

const CATEGORIES = [...new Set(allQuestions.map(q => q.category))];

function getScoreMessage(score: number, total: number) {
  const pct = (score / total) * 100;
  if (pct === 100) return "Perfect score. You know this company inside out.";
  if (pct >= 80) return "Excellent. A couple of gaps to fill, but you're well prepared.";
  if (pct >= 60) return "Good foundation. Review the categories highlighted below and try again.";
  if (pct >= 40) return "Decent start. Focus on the sections where you dropped marks before the interview.";
  return "Lots to learn — but that's what this is for. Review the explanations carefully and try again.";
}

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [done, setDone] = useState(false);

  // Shuffle once on mount
  const questions = useMemo(() => [...allQuestions].sort(() => Math.random() - 0.5), []);

  const current = questions[currentIndex];
  const score = answers.filter((a, i) => a === questions[i].correct).length;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (currentIndex + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrentIndex(c => c + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setStarted(false);
    setCurrentIndex(0);
    setSelected(null);
    setAnswers([]);
    setDone(false);
  };

  // Per-category scores for results breakdown
  const categoryScores = CATEGORIES.map(cat => {
    const qs = questions.map((q, i) => ({ q, i })).filter(({ q }) => q.category === cat);
    const correct = qs.filter(({ i }) => answers[i] === questions[i].correct).length;
    return { cat, correct, total: qs.length };
  });

  const progress = ((currentIndex + (selected !== null ? 1 : 0)) / questions.length) * 100;

  if (!started) {
    return (
      <div className="p-8 max-w-3xl mx-auto pb-24">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <p className="text-sm font-semibold text-subsea-600 tracking-wider uppercase">Final Test</p>
            <h1 className="text-3xl font-bold text-gray-900">Full Interview Quiz</h1>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6 space-y-4">
          <p className="text-gray-700 leading-relaxed text-lg">
            This is the full knowledge test. It covers everything you need to know for the 
            Reach Subsea interview — the company, the vessels, the industry terms, the role, 
            the values, and the carbon work.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These are multiple-choice questions, but they're written to be genuinely tough — 
            the wrong options are plausible, not obviously silly. If you can get 80%+ on this, 
            you are well prepared.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            {CATEGORIES.map(cat => {
              const count = allQuestions.filter(q => q.category === cat).length;
              return (
                <div key={cat} className="bg-subsea-50 rounded-lg p-4 border border-subsea-100">
                  <p className="text-xs font-bold text-subsea-600 uppercase tracking-wider mb-1">{cat}</p>
                  <p className="text-2xl font-bold text-subsea-900">{count}</p>
                  <p className="text-xs text-gray-500">questions</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-subsea-950 rounded-xl p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">{questions.length} questions total</h2>
            <p className="text-subsea-200">Questions are shuffled each time. No time limit.</p>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="flex-shrink-0 flex items-center bg-subsea-500 hover:bg-subsea-400 text-white font-semibold py-3 px-7 rounded-lg transition-colors"
          >
            Start the Quiz <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="p-8 max-w-3xl mx-auto pb-24">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Your Results</h1>
        </div>

        {/* Score */}
        <div className="bg-subsea-950 rounded-xl p-8 text-white mb-8">
          <div className="flex items-center space-x-5 mb-4">
            <Trophy className="w-12 h-12 text-subsea-400 flex-shrink-0" />
            <div>
              <p className="text-5xl font-bold">{score} <span className="text-2xl text-subsea-300">/ {questions.length}</span></p>
              <p className="text-subsea-200 mt-1">{Math.round((score / questions.length) * 100)}% correct</p>
            </div>
          </div>
          <p className="text-subsea-100 leading-relaxed">{getScoreMessage(score, questions.length)}</p>
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Breakdown by Category</h2>
          <div className="space-y-4">
            {categoryScores.map(({ cat, correct, total }) => {
              const pct = Math.round((correct / total) * 100);
              const colour = pct === 100 ? "bg-green-500" : pct >= 60 ? "bg-subsea-500" : "bg-red-400";
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-800">{cat}</span>
                    <span className="text-gray-500">{correct} / {total}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`${colour} h-2.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Per-question review */}
        <div className="space-y-3 mb-8">
          <h2 className="text-lg font-bold text-gray-900">Question-by-Question Review</h2>
          {questions.map((q, i) => {
            const correct = answers[i] === q.correct;
            return (
              <details key={i} className={`rounded-xl border overflow-hidden ${correct ? "border-green-200" : "border-red-200"}`}>
                <summary className={`px-5 py-4 flex items-start space-x-3 cursor-pointer list-none ${correct ? "bg-green-50" : "bg-red-50"}`}>
                  {correct
                    ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">{q.category}</p>
                    <p className="text-sm font-semibold text-gray-900">{q.question}</p>
                  </div>
                </summary>
                <div className="px-5 py-4 bg-white space-y-2">
                  {!correct && (
                    <p className="text-sm text-red-700">
                      <span className="font-bold">You answered:</span> {q.options[answers[i] ?? 0]}
                    </p>
                  )}
                  <p className="text-sm text-green-700">
                    <span className="font-bold">Correct answer:</span> {q.options[q.correct]}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed pt-1 border-t border-gray-100">{q.explanation}</p>
                </div>
              </details>
            );
          })}
        </div>

        <button
          onClick={reset}
          className="flex items-center bg-subsea-600 hover:bg-subsea-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          <RotateCcw className="w-5 h-5 mr-2" /> Try Again with Shuffled Questions
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto pb-24">
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Full Interview Quiz</h1>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span className="font-semibold text-gray-700">Question {currentIndex + 1} of {questions.length}</span>
          <span className="font-semibold text-subsea-600">{current.category}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-subsea-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <p className="text-xl font-bold text-gray-900 leading-snug mb-8">{current.question}</p>

        <div className="space-y-3">
          {current.options.map((opt, i) => {
            let style = "border-gray-200 bg-white hover:border-subsea-400 text-gray-800";
            if (selected !== null) {
              if (i === current.correct) style = "border-green-500 bg-green-50 text-green-900";
              else if (i === selected) style = "border-red-400 bg-red-50 text-red-900";
              else style = "border-gray-100 bg-gray-50 text-gray-400";
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm font-medium leading-relaxed ${style}`}
              >
                <span className="font-bold mr-3 text-gray-400">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className={`mt-6 rounded-xl p-5 flex items-start space-x-3 ${selected === current.correct ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            {selected === current.correct
              ? <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              : <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            }
            <div>
              <p className={`font-bold mb-1 ${selected === current.correct ? "text-green-800" : "text-red-700"}`}>
                {selected === current.correct ? "Correct!" : "Not quite."}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{current.explanation}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {answers.filter((a, i) => a === questions[i].correct).length} correct so far
        </p>
        <button
          onClick={handleNext}
          disabled={selected === null}
          className="flex items-center bg-subsea-600 hover:bg-subsea-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-40"
        >
          {currentIndex + 1 >= questions.length ? (
            <><ClipboardList className="w-5 h-5 mr-2" /> See My Results</>
          ) : (
            <>Next Question <ArrowRight className="ml-2 w-5 h-5" /></>
          )}
        </button>
      </div>
    </div>
  );
}

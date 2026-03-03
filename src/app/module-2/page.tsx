"use client";

import React, { useState } from "react";
import { ArrowLeftRight, Code, Mountain, ShieldCheck, ArrowLeft, Target, BookOpen, Users, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

// When the user types something, we try to match their experience to an engineering reframe.
// The output is in plain English, not jargon.
const translationLogic = [
  {
    keywords: ["run", "mountain", "race", "athlet", "marathon", "trail", "climb"],
    translation: "Shows that you can push through difficult and uncomfortable situations without giving up. Offshore projects can be long and stressful — this experience proves you won't crumble under pressure.",
  },
  {
    keywords: ["python", "matlab", "code", "script", "program", "software", "data", "algorithm"],
    translation: "You can write computer programs to process and analyse data. At Reach Subsea, the vessels generate enormous amounts of sonar and sensor data. Being able to write scripts to sort, clean, and visualise that data quickly is genuinely valuable — most engineers can't do this.",
  },
  {
    keywords: ["seismic", "field", "survey", "node", "equipment", "geophys"],
    translation: "You've worked in the field with scientific instruments in difficult environments. This shows you understand how to safely set up and use technical equipment outdoors — a direct parallel to offshore work.",
  },
  {
    keywords: ["team", "group", "lead", "mentor", "teach", "coach", "captain"],
    translation: "You can work with and support others to achieve a shared goal. Reach Subsea's culture is built around this — they literally call one of their core values 'Teach', meaning they expect people to share knowledge and bring colleagues along with them.",
  },
  {
    keywords: ["plan", "organis", "logistics", "coordinat", "manag"],
    translation: "You know how to organise things in advance and adapt when things change. As a Project Engineer, your whole job is coordinating people, equipment, and timelines — often at the same time.",
  },
];

const athleticMapping = [
  {
    value: "Learn",
    icon: BookOpen,
    companyMeaning: "Reach Subsea expects everyone to keep improving. They don't want people who think they know everything already.",
    yourExample: "Before a mountain race, you study the route, elevation profile, weather history, and your own physiological data to prepare the best strategy. You adapt as new information comes in.",
    interviewLine: "\"I approach preparation very systematically — I research thoroughly, build a plan, then adjust it as conditions change. I think that applies equally to a race briefing and to a pre-offshore project plan.\"",
  },
  {
    value: "Teach",
    icon: Users,
    companyMeaning: "Nobody gets left behind. More experienced people are expected to support those who are less experienced.",
    yourExample: "You've mentored other athletes, shared route knowledge, or looked after a teammate during an event to make sure they got through safely.",
    interviewLine: "\"I've always believed that the success of the group matters more than my individual result. I've helped other runners prepare for events and I'd bring that same attitude to supporting colleagues at work.\"",
  },
  {
    value: "Reach",
    icon: Target,
    companyMeaning: "Set high goals and go for them, even when it's hard.",
    yourExample: "Competing in international mountain races against experienced competitors, in extreme conditions, over huge distances — this is not easy and not many people do it.",
    interviewLine: "\"Competing internationally taught me to be comfortable with uncertainty and discomfort. I've learned to stay focused and execute under pressure. That's exactly what a long offshore campaign asks of you.\"",
  },
];

const valuesScenarios = [
  {
    scenario: "You notice a junior colleague is confused about a document and getting frustrated. You spend 20 minutes patiently walking them through it, even though it's not your responsibility.",
    answer: "Teach",
    explanation: "This is the 'Teach' value — making sure no one is left behind, even when it costs you time. Reach Subsea are very explicit about this being part of the job.",
    distractors: ["Learn", "Reach"],
  },
  {
    scenario: "After a project doesn't go as planned, you spend time writing up exactly what went wrong and why — and you share it with the team so everyone can learn from it.",
    answer: "Learn",
    explanation: "This is 'Learn' — actively seeking to understand what happened and using it to improve. The company wants people who are honest about mistakes and grow from them.",
    distractors: ["Teach", "Reach"],
  },
  {
    scenario: "The client asks for the inspection to be done in half the usual time, in challenging weather conditions. You work out a way to do it safely and deliver on time.",
    answer: "Reach",
    explanation: "This is 'Reach' — setting high ambitions and finding a way to deliver even when it's difficult. It's about going beyond what's comfortable.",
    distractors: ["Learn", "Teach"],
  },
  {
    scenario: "You voluntarily attend a training session on new sonar processing software, even though it's not required for your current project.",
    answer: "Learn",
    explanation: "This is 'Learn' — proactively seeking new knowledge and not waiting to be told to develop. Reach Subsea values people who drive their own growth.",
    distractors: ["Teach", "Reach"],
  },
  {
    scenario: "You share your knowledge of local Scottish weather patterns with the whole team before a deployment — even though you figured it out yourself through your own research.",
    answer: "Teach",
    explanation: "This is 'Teach' — sharing what you know so the whole team benefits, not keeping knowledge to yourself. That's what 'no one left behind' looks like in practice.",
    distractors: ["Learn", "Reach"],
  },
];

export default function Module2() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  // Values quiz state
  const [vqActive, setVqActive] = useState(false);
  const [vqIndex, setVqIndex] = useState(0);
  const [vqSelected, setVqSelected] = useState<string | null>(null);
  const [vqScore, setVqScore] = useState(0);
  const [vqDone, setVqDone] = useState(false);

  const vqCurrent = valuesScenarios[vqIndex];
  const vqOptions = [...vqCurrent.distractors, vqCurrent.answer].sort(() => Math.random() - 0.5);

  const handleVqSelect = (option: string) => {
    if (vqSelected !== null) return;
    setVqSelected(option);
  };

  const handleVqNext = () => {
    if (vqSelected === vqCurrent.answer) setVqScore(s => s + 1);
    if (vqIndex + 1 >= valuesScenarios.length) {
      setVqDone(true);
    } else {
      setVqIndex(i => i + 1);
      setVqSelected(null);
    }
  };

  const resetVq = () => {
    setVqActive(false);
    setVqIndex(0);
    setVqSelected(null);
    setVqScore(0);
    setVqDone(false);
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    setTranslatedText(null);
    setNoMatch(false);

    setTimeout(() => {
      const lowerInput = inputText.toLowerCase();
      let found: string | null = null;

      for (const logic of translationLogic) {
        if (logic.keywords.some(kw => lowerInput.includes(kw))) {
          found = logic.translation;
          break;
        }
      }

      if (found) {
        setTranslatedText(found);
      } else {
        setNoMatch(true);
        setTranslatedText("Try being more specific — mention what you actually did (e.g. 'ran a race', 'wrote Python code', 'did a seismic survey').");
      }
      setIsTranslating(false);
    }, 700);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <p className="text-sm font-semibold text-subsea-600 tracking-wider uppercase">Step 2</p>
          <h1 className="text-3xl font-bold text-gray-900">Your Skills, Reframed</h1>
        </div>
      </div>

      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <p className="text-gray-700 leading-relaxed text-lg mb-4">
          You might worry that a Geophysics degree and competitive running don't look very relevant 
          to a subsea engineering job. That's understandable — but it's wrong. 
        </p>
        <p className="text-gray-700 leading-relaxed">
          The problem isn't what you've done. It's how you describe it. Engineers and interviewers 
          don't think in terms of "mountain races" or "seismic surveys" — they think in terms of 
          project delivery, data management, safety awareness, and teamwork. This module shows you 
          how to translate your real experiences into that language.
        </p>
      </section>

      {/* Translation Tool */}
      <section className="bg-subsea-50 rounded-xl p-8 border border-subsea-100">
        <div className="flex items-center space-x-3 mb-2">
          <ArrowLeftRight className="w-7 h-7 text-subsea-600" />
          <h2 className="text-2xl font-bold text-gray-900">Experience Translator</h2>
        </div>
        <p className="text-gray-600 mb-6 text-sm">
          Type something you've done — a race, a piece of fieldwork, a coding project — and see 
          how to explain it in a way an engineering interviewer will understand and value.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">What did you do?</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. I completed a 100km mountain race in bad weather..."
              className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-subsea-500 focus:border-subsea-500 transition-all resize-none text-gray-800"
            />
            <button
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim()}
              className="w-full bg-subsea-600 hover:bg-subsea-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isTranslating ? (
                <span className="animate-pulse">Thinking...</span>
              ) : (
                <>How do I say this in engineering terms? <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700">How to explain this to an interviewer</label>
            <div className={`w-full min-h-[128px] p-6 rounded-lg border-2 transition-all flex items-center justify-center text-center ${translatedText ? (noMatch ? 'bg-amber-50 border-amber-300' : 'bg-white border-subsea-400 shadow-sm') : 'bg-gray-50 border-dashed border-gray-300'}`}>
              {translatedText ? (
                <p className="text-gray-900 font-medium leading-relaxed text-sm">{translatedText}</p>
              ) : (
                <p className="text-gray-400 italic text-sm">Your reframed answer will appear here.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The key skills */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-3">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-subsea-50 text-subsea-600 rounded-lg">
              <Code className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your Coding Skills</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            The Reach Remote vessels collect huge amounts of sonar and sensor data. Currently, 
            many engineers spend most of their time just finding, moving, and opening files — 
            rather than actually analysing anything.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            If you can write Python or MATLAB scripts to automate that process, you are genuinely 
            valuable. Don't be modest about this — it's a real skill shortage in the industry.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-3">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-subsea-50 text-subsea-600 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your Field Experience</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            Offshore work is just field work at sea. The parallels are direct:
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><span className="font-semibold text-gray-900">Equipment logistics:</span> Seismic node mobilisation = vessel load-out planning.</li>
            <li><span className="font-semibold text-gray-900">Safety culture:</span> Field survey protocols = offshore safety management. (Reach Subsea has had zero major spills since 2013.)</li>
            <li><span className="font-semibold text-gray-900">Working across teams:</span> Coordinating geologists/technicians in the field = managing ROV operators and marine crew offshore.</li>
          </ul>
        </div>
      </div>

      {/* Athletic values mapping */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <Mountain className="w-8 h-8 text-subsea-600" />
          <h2 className="text-2xl font-bold text-gray-900">The "Learn, Teach, Reach" Values</h2>
        </div>
        <p className="text-gray-700 max-w-3xl leading-relaxed">
          Reach Subsea has three core values: <strong>Learn, Teach, Reach</strong>. You'll likely be 
          asked about them directly or indirectly in the interview. Here's how your mountain running 
          maps onto each one — plus suggested phrases to use.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {athleticMapping.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center space-x-3 mb-4">
                <item.icon className="w-6 h-6 text-subsea-600" />
                <h3 className="text-xl font-bold text-gray-900">{item.value}</h3>
              </div>
              <div className="mb-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">What the company means by it</p>
                <p className="text-sm text-gray-700">{item.companyMeaning}</p>
              </div>
              <div className="mb-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Your equivalent experience</p>
                <p className="text-sm text-gray-700">{item.yourExample}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-subsea-600 uppercase tracking-wider mb-1">Example phrase to use</p>
                <p className="text-sm text-gray-800 italic">{item.interviewLine}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Quiz */}
      <section className="bg-subsea-950 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Values Quiz — Which Value Is It?</h2>
        <p className="text-subsea-100 mb-6 leading-relaxed">
          Read each scenario and decide whether it's an example of <strong>Learn</strong>, <strong>Teach</strong>, 
          or <strong>Reach</strong>. This is a great way to make sure you can use these values naturally 
          in the interview — not just recite the definitions.
        </p>

        {!vqActive && !vqDone && (
          <button
            onClick={() => setVqActive(true)}
            className="bg-subsea-500 hover:bg-subsea-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Start the Values Quiz — 5 scenarios
          </button>
        )}

        {vqActive && !vqDone && (
          <div>
            <p className="text-subsea-300 text-sm font-semibold mb-4 uppercase tracking-wider">
              Scenario {vqIndex + 1} of {valuesScenarios.length}
            </p>
            <div className="bg-subsea-900 border border-subsea-700 rounded-xl p-6 mb-6">
              <p className="text-white leading-relaxed">{vqCurrent.scenario}</p>
            </div>
            <p className="text-subsea-200 text-sm mb-3">Which Reach Subsea value does this demonstrate?</p>
            <div className="flex gap-4 mb-6 flex-wrap">
              {["Learn", "Teach", "Reach"].map((opt) => {
                let style = "border-subsea-700 bg-subsea-900 hover:border-subsea-400";
                if (vqSelected !== null) {
                  if (opt === vqCurrent.answer) style = "border-green-400 bg-green-900/50";
                  else if (opt === vqSelected) style = "border-red-400 bg-red-900/50";
                  else style = "border-subsea-800 bg-subsea-900 opacity-40";
                }
                return (
                  <button
                    key={opt}
                    onClick={() => handleVqSelect(opt)}
                    disabled={vqSelected !== null}
                    className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg border-2 font-bold text-lg transition-all ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {vqSelected !== null && (
              <div className={`rounded-lg p-4 mb-5 flex items-start space-x-3 ${vqSelected === vqCurrent.answer ? "bg-green-900/30 border border-green-700" : "bg-red-900/30 border border-red-700"}`}>
                {vqSelected === vqCurrent.answer
                  ? <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                }
                <p className="text-subsea-100 text-sm leading-relaxed">{vqCurrent.explanation}</p>
              </div>
            )}

            <button
              onClick={handleVqNext}
              disabled={vqSelected === null}
              className="bg-white text-subsea-900 font-semibold py-2 px-6 rounded-lg hover:bg-subsea-50 transition-colors disabled:opacity-40"
            >
              {vqIndex + 1 >= valuesScenarios.length ? "See My Score" : "Next Scenario →"}
            </button>
          </div>
        )}

        {vqDone && (
          <div>
            <div className="flex items-center space-x-4 mb-5">
              <CheckCircle2 className="w-10 h-10 text-subsea-400" />
              <div>
                <h3 className="text-2xl font-bold">{vqScore} / {valuesScenarios.length} correct</h3>
                <p className="text-subsea-200">
                  {vqScore === valuesScenarios.length
                    ? "You've got these values down. You'll be able to use them naturally in the interview."
                    : vqScore >= 3
                    ? "Good. Re-read the ones you missed — the distinctions between Learn and Teach are subtle."
                    : "Have another go. Understanding these values well is really important for this particular company."}
                </p>
              </div>
            </div>
            <button onClick={resetVq} className="bg-subsea-500 hover:bg-subsea-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Try Again
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

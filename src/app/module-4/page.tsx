"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, ArrowLeft, CheckCircle, Save } from "lucide-react";
import Link from "next/link";

const competences = [
  {
    level: "A",
    title: "Knowledge — knowing your stuff",
    plain: "You need to prove that you understand the technical theory behind your work. For you, this means showing that your Geophysics degree gave you real scientific knowledge that applies to engineering — maths, physics, data analysis — not just vague 'transferable skills'.",
    goalPrompt: "Write one specific example of technical knowledge from your degree or fieldwork that you could apply in this job.",
  },
  {
    level: "B",
    title: "Design — turning knowledge into plans",
    plain: "You need to show that you can use your knowledge to actually create something — a plan, a process, a document. In this job, that means things like writing method statements and risk assessments for offshore operations.",
    goalPrompt: "What will you produce in your first year that demonstrates you can design a process or write a technical document?",
  },
  {
    level: "C",
    title: "Leadership — taking responsibility",
    plain: "As you progress, you'll take on more responsibility — coordinating contractors, managing small budgets, making decisions. You need to show you're heading in that direction, not just following instructions.",
    goalPrompt: "What is one responsibility you'd like to take on in your first year that goes beyond just completing tasks you're told to do?",
  },
  {
    level: "D",
    title: "Communication — explaining things clearly",
    plain: "Engineers who can write clearly and speak confidently are rare and valuable. You'll need to write reports, run safety briefings, and explain technical decisions to people who may not have your background.",
    goalPrompt: "Name a specific type of document or briefing you'll aim to lead or contribute to in the first year.",
  },
  {
    level: "E",
    title: "Professional behaviour — doing the right thing",
    plain: "This is about safety, honesty, ethics, and continuing to learn. Reach Subsea has an excellent safety record and takes this very seriously. You need to show you take it seriously too.",
    goalPrompt: "What does 'professional commitment' look like to you in an engineering role? Write a sentence or two.",
  },
];

export default function Module4() {
  const [goals, setGoals] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("reach_subsea_goals");
    if (saved) {
      try { setGoals(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleGoalChange = (level: string, value: string) => {
    setGoals(prev => ({ ...prev, [level]: value }));
    setIsSaved(false);
  };

  const saveGoals = () => {
    localStorage.setItem("reach_subsea_goals", JSON.stringify(goals));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const filled = Object.values(goals).filter(v => v && v.trim().length > 10).length;
  const pct = (filled / competences.length) * 100;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <p className="text-sm font-semibold text-subsea-600 tracking-wider uppercase">Step 4</p>
          <h1 className="text-3xl font-bold text-gray-900">Engineering Registration</h1>
        </div>
      </div>

      {/* Plain intro */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-4">
        <p className="text-gray-700 leading-relaxed text-lg">
          Reach Subsea will support you in working towards becoming a <strong>Chartered Engineer</strong> — 
          a professional qualification that is a big deal in the engineering industry. If you mention 
          in the interview that you already know how this process works and you're motivated to pursue it, 
          that will impress the panel.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The qualification is awarded by the <strong>Institution of Mechanical Engineers (IMechE)</strong> — 
          one of the main professional bodies for engineers in the UK. You apply after you've built up 
          enough work experience.
        </p>
      </section>

      {/* The situation for a Geophysics graduate */}
      <section className="bg-subsea-950 rounded-xl p-8 text-white space-y-4">
        <div className="flex items-center space-x-3 mb-2">
          <GraduationCap className="w-8 h-8 text-subsea-400" />
          <h2 className="text-2xl font-bold">Your Route In — The Academic Assessment</h2>
        </div>
        <p className="text-subsea-100 leading-relaxed">
          Normally, to apply for Chartered Engineer, you need a degree in engineering (like Mechanical 
          Engineering). Because your degree is in Geophysics, you take a slightly different route called 
          an <strong>Academic Assessment</strong>.
        </p>
        <p className="text-subsea-100 leading-relaxed">
          A panel at the IMechE reviews your degree and work experience to check that you have sufficient 
          scientific and mathematical knowledge. Given your Geophysics training — which covers physics, 
          maths, data analysis, and field work — this is absolutely achievable.
        </p>
        <div className="bg-subsea-800 rounded-lg p-5 mt-2">
          <p className="text-sm font-bold text-subsea-300 uppercase tracking-wider mb-2">What to say in the interview</p>
          <p className="text-white leading-relaxed italic">
            "I know that with a Geophysics background I'll be going through the IMechE Academic Assessment 
            route rather than the standard degree-accredited route. I'm comfortable with that — my degree 
            covered the core physics and mathematical principles, and I'm looking forward to building the 
            practical engineering experience here at Reach Subsea to complement it."
          </p>
        </div>
      </section>

      {/* The 5 competences */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">The Five Areas You'll Be Assessed On</h2>
          <p className="text-gray-600 max-w-3xl leading-relaxed mb-4">
            The Chartered Engineer qualification is assessed across five areas, labelled A to E. 
            For each one below, there's a plain-English explanation of what it means — and space 
            for you to write your own goal. Your answers are saved in your browser automatically 
            when you click Save.
          </p>

          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-subsea-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-600 w-20 text-right">{filled} of {competences.length} filled</span>
          </div>
        </div>

        <div className="space-y-5">
          {competences.map((comp) => (
            <div
              key={comp.level}
              className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="bg-subsea-50 px-6 py-6 flex flex-col items-center justify-center md:w-28 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200">
                <span className="text-xs font-bold text-subsea-600 uppercase mb-1">Area</span>
                <span className="text-4xl font-bold text-subsea-900">{comp.level}</span>
              </div>
              <div className="p-6 flex-1 space-y-4">
                <h3 className="font-bold text-gray-900 text-lg">{comp.title}</h3>
                <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-subsea-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">{comp.plain}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Your goal
                  </label>
                  <textarea
                    value={goals[comp.level] || ""}
                    onChange={(e) => handleGoalChange(comp.level, e.target.value)}
                    placeholder={comp.goalPrompt}
                    className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-subsea-500 min-h-[80px] resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={saveGoals}
            className={`flex items-center px-6 py-3 rounded-lg font-bold text-white transition-colors ${
              isSaved ? "bg-green-500" : "bg-subsea-600 hover:bg-subsea-700"
            }`}
          >
            {isSaved ? (
              <><CheckCircle className="w-5 h-5 mr-2" /> Saved!</>
            ) : (
              <><Save className="w-5 h-5 mr-2" /> Save My Goals</>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { MessageSquare, ArrowLeft, HelpCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

const qAndA = [
  {
    type: "Technical question",
    question: "You'll be handling a lot of data from our offshore surveys. How do your skills prepare you for that?",
    whyTheyAsk: "They want to know if you can actually help with their data processing problem — not just say you're 'good with computers'.",
    howToAnswer: [
      "Name the specific tools you've used: Python, MATLAB.",
      "Explain what you used them for: processing geophysical data, automating analysis, visualising results.",
      "Connect it directly to their problem: the Reach Remote vessels produce huge amounts of sonar data. Many engineers spend most of their time just managing files rather than doing analysis. You can help automate that.",
    ],
    example: "\"In my degree I used Python to process seismic data — cleaning it, running analysis scripts, and producing visualisations. I understand that the Reach Remote vessels generate a lot of sonar and sensor data. I'd want to look at where the bottlenecks are in the processing workflow and write scripts to automate the repetitive parts, so the engineers can spend more time on actual interpretation.\"",
  },
  {
    type: "Technical question",
    question: "You don't have a mechanical engineering background. How would you approach writing a method statement for an ROV inspection?",
    whyTheyAsk: "They're checking whether you'll admit what you don't know, and whether you have a sensible approach to filling those gaps.",
    howToAnswer: [
      "Don't pretend you'd figure it out alone. Say you'd work with experienced people.",
      "Show you understand the structure of a method statement (from Step 3 of this prep).",
      "Use your Geophysics background as an asset — you understand the seabed environment, which is directly relevant to planning an underwater inspection.",
    ],
    example: "\"I'd start by reading previous method statements for similar jobs, to understand the format and what's expected. Then I'd sit with the ROV supervisor and senior engineer to understand the mechanical and operational constraints. My contribution would be on the environmental side — understanding the seabed conditions, sediment type, any potential hazards — which directly feeds into the risk assessment section.\"",
  },
  {
    type: "Personal / behavioural question",
    question: "Tell me about a time you faced a really difficult challenge. What happened and what did you learn?",
    whyTheyAsk: "They want to understand how you handle pressure and setbacks — and whether you reflect and learn from them. This maps to their 'Learn' and 'Reach' values.",
    howToAnswer: [
      "Use the STAR method (explained below this list).",
      "Choose a mountain running story — something with real stakes, physical difficulty, and a genuine decision point.",
      "Make sure to include what you actually learned — don't skip the ending.",
    ],
    example: "\"In [race name], I was on course for a good result when the weather turned significantly worse in the final third. I had to make a decision: push on with less visibility and cold rain, or slow down and manage the risk. I chose to continue but changed my strategy — slowing my pace, checking my navigation more frequently, and conserving energy. I finished safely but not as fast as I'd hoped. What I took from that is: staying composed when the plan changes is more important than the original plan. That's something I think about in any project context now.\"",
  },
  {
    type: "Personal / behavioural question",
    question: "Reach Subsea has a value called 'Teach' — can you give me an example of how you've helped others?",
    whyTheyAsk: "Their culture is built on experienced people actively supporting those with less experience. They want to know you'll do the same.",
    howToAnswer: [
      "Give a specific example — not 'I'm a good team player' in general.",
      "It can be from sport, university, fieldwork — doesn't need to be a formal mentoring role.",
      "Focus on what the other person got out of it, not just what you did.",
    ],
    example: "\"During a multi-day mountain race I was doing with a less experienced friend, they hit a very low point around hour 18. Rather than push ahead, I slowed down and stayed with them — helped them eat, talked through the remaining route, and reminded them why they were doing it. They finished. I think the principle is the same in a work setting: if a colleague is struggling, the team is only as good as how well you support them.\"",
  },
  {
    type: "Motivation question",
    question: "Why do you want to work in the subsea industry specifically — and why Reach Subsea?",
    whyTheyAsk: "They're checking whether you've genuinely thought about this, or whether you're just applying everywhere. A vague answer about 'finding it interesting' won't impress them.",
    howToAnswer: [
      "Connect your Geophysics background directly — you've already been working with subsea data types (sonar, gravity, seismic) and you want to apply that at sea.",
      "Be specific about Reach Subsea — mention the Reach Remote project. You're drawn to a company that's genuinely innovating, not just running the same operations as everyone else.",
      "Mention the Aberdeen office and the North Sea context — it matters that you want to be in that specific market.",
    ],
    example: "\"My degree gave me a real grounding in the data that drives subsea work — seismic, gravity, multibeam sonar. But I want to be in the environment that generates that data, not just studying it after the fact. Reach Subsea specifically caught my attention because of the Reach Remote project — using uncrewed vessels to do work that previously required a full ship and crew is a genuine step change. That's the kind of company I want to grow with. And the Aberdeen office being the North Sea hub means the work I'd be doing is genuinely relevant and immediate.\"",
  },
  {
    type: "Career goals question",
    question: "Where do you see yourself in five years — what are your ambitions?",
    whyTheyAsk: "They want someone who has thought about their development, not someone who expects to just coast. They've said they invest in people — they want to see you're worth investing in.",
    howToAnswer: [
      "Be specific and realistic. Not 'CEO in five years' — but also not 'I'm not sure, wherever things take me'.",
      "Reference the Chartered Engineer qualification (from Step 4) — having a named professional goal shows maturity.",
      "Show that your ambitions fit inside their company, not outside it.",
    ],
    example: "\"In five years I'd want to be leading my own project scopes independently — managing the contractor interfaces, writing the method statements, and being the person the client talks to. I'd also want to be well on the way through the IMechE Academic Assessment route to Chartered Engineer status, hopefully with enough documented evidence from real offshore projects to support a strong application. I know that's a lot to build in five years, but that's why the graduate programme structure here appeals to me — it's a structured environment to develop quickly.\"",
  },
  {
    type: "Problem-solving question",
    question: "You're halfway through planning a project and you realise some key information is missing. You can't wait — the deadline is fixed. What do you do?",
    whyTheyAsk: "Offshore projects almost never have all the information you'd like. They want to know you can make sensible, documented decisions under uncertainty — not freeze or pretend the problem isn't there.",
    howToAnswer: [
      "Don't say you'd wait. Show you'd act.",
      "Explain that you'd identify exactly what's missing and find the best available substitute — a conservative assumption, a similar previous project, an expert opinion.",
      "Say you'd document your assumptions clearly so that if the information turns up later and it changes things, everyone can see exactly what the original decision was based on.",
    ],
    example: "\"I'd first make sure I was clear on what exactly was missing and whether it was actually critical — sometimes what looks like a gap isn't one that affects the key decisions. If it is critical, I'd look for the most conservative safe assumption I could justify, check it with a senior engineer, and document it clearly so it's flagged for review. The worst thing you can do in that situation is make an assumption and not write it down — then nobody knows later whether it was deliberate or an oversight.\"",
  },
];

const panelQuestions = [
  {
    topic: "About the technology",
    q: "Now that Reach Remote 1 and 2 are operational, how do you see the day-to-day role of the onshore project engineer changing as the fleet grows — particularly in how you'll interact with the data coming off these vessels?",
    whyGood: "Shows you've done your research on the Reach Remote project and are already thinking about what the job will look like, not just what it looks like now.",
  },
  {
    topic: "About the Aberdeen office",
    q: "I understand the Aberdeen office has recently moved and grown to support the North Sea market. How do you see the project team here developing over the next couple of years?",
    whyGood: "Shows you know where the office is and why it matters, and that you're thinking about your future there.",
  },
  {
    topic: "About your development",
    q: "How does mentorship typically work for a graduate engineer coming in from a non-mechanical background — and how quickly do engineers usually get to take responsibility for their own project scopes?",
    whyGood: "Shows you're serious about developing quickly, and gives them a chance to tell you something genuinely useful about the role.",
  },
];

export default function Module5() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <p className="text-sm font-semibold text-subsea-600 tracking-wider uppercase">Step 5</p>
          <h1 className="text-3xl font-bold text-gray-900">Practice Questions</h1>
        </div>
      </div>

      {/* Plain intro + STAR explanation */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-5">
        <p className="text-gray-700 leading-relaxed text-lg">
          These are the types of questions Reach Subsea are likely to ask. Click on each one to 
          see why they're asking it, how to structure your answer, and an example of what a good 
          answer sounds like.
        </p>
        <div className="bg-subsea-50 rounded-xl p-6 border border-subsea-100">
          <h3 className="font-bold text-gray-900 text-lg mb-3">The STAR Method — how to structure any personal question</h3>
          <p className="text-gray-700 text-sm mb-4">
            For any question that starts with "tell me about a time when..." or "give me an example of...", 
            use this four-part structure. It keeps your answer clear and stops you rambling.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { letter: "S", word: "Situation", desc: "Set the scene briefly. When and where? What was the context?" },
              { letter: "T", word: "Task", desc: "What was your specific responsibility or goal in that situation?" },
              { letter: "A", word: "Action", desc: "What did YOU actually do? Be specific — not 'we', but 'I'." },
              { letter: "R", word: "Result", desc: "What happened? What did you learn? What would you do differently?" },
            ].map(item => (
              <div key={item.letter} className="bg-white rounded-lg p-4 border border-subsea-200 text-center">
                <div className="text-3xl font-bold text-subsea-700 mb-1">{item.letter}</div>
                <div className="font-bold text-gray-900 mb-2">{item.word}</div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="space-y-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-8 h-8 text-subsea-600" />
          <h2 className="text-2xl font-bold text-gray-900">Interview Questions</h2>
        </div>

        <div className="space-y-4">
          {qAndA.map((qa, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveQuestion(activeQuestion === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-start justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="pr-8">
                  <p className="text-xs font-bold text-subsea-600 uppercase tracking-wide mb-1">{qa.type}</p>
                  <p className="font-semibold text-gray-900 text-base">"{qa.question}"</p>
                </div>
                <ChevronRight className={`w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5 transform transition-transform ${activeQuestion === idx ? 'rotate-90' : ''}`} />
              </button>

              {activeQuestion === idx && (
                <div className="border-t border-gray-100 divide-y divide-gray-100">
                  <div className="px-6 py-5 bg-amber-50">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Why they're asking this</p>
                    <p className="text-sm text-gray-800 leading-relaxed">{qa.whyTheyAsk}</p>
                  </div>

                  <div className="px-6 py-5">
                    <p className="text-xs font-bold text-subsea-600 uppercase tracking-wider mb-3">How to answer it — step by step</p>
                    <ul className="space-y-2">
                      {qa.howToAnswer.map((step, i) => (
                        <li key={i} className="flex items-start space-x-3 text-sm text-gray-700">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-subsea-100 text-subsea-800 flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-6 py-5 bg-gray-50">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Example answer</p>
                    <p className="text-sm text-gray-800 italic leading-relaxed">{qa.example}</p>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Questions to ask them */}
      <section className="bg-subsea-950 rounded-xl p-8 text-white space-y-6">
        <div className="flex items-center space-x-3">
          <HelpCircle className="w-8 h-8 text-subsea-400" />
          <h2 className="text-2xl font-bold">Good Questions to Ask Them</h2>
        </div>
        <p className="text-subsea-100 leading-relaxed">
          At the end of any interview, they'll ask "do you have any questions for us?" 
          <strong className="text-white"> Always say yes.</strong> Asking smart questions shows you've 
          done your research and are genuinely interested — not just going through the motions. 
          Here are three strong options:
        </p>

        <div className="space-y-4">
          {panelQuestions.map((pq, idx) => (
            <div key={idx} className="bg-subsea-900 border border-subsea-800 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-subsea-300 uppercase tracking-wider">{pq.topic}</h3>
              <p className="text-white italic leading-relaxed">"{pq.q}"</p>
              <div className="pt-2 border-t border-subsea-800">
                <p className="text-xs font-bold text-subsea-400 uppercase tracking-wider mb-1">Why this is a good question</p>
                <p className="text-subsea-200 text-sm leading-relaxed">{pq.whyGood}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

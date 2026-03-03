import React from "react";
import { ArrowLeft, Ship, Anchor, Globe, Leaf, TrendingUp, MapPin, Users, Clock, Zap } from "lucide-react";
import Link from "next/link";

const keyFacts = [
  { icon: TrendingUp, label: "Revenue (2024)", value: "NOK 2.7 billion", note: "A record year for the company" },
  { icon: Clock, label: "In operation since", value: "2013", note: "Zero major environmental spills in that time" },
  { icon: Ship, label: "Uncrewed vessels", value: "2 deployed", note: "Reach Remote 1 & 2, delivered 2025" },
  { icon: Globe, label: "Operates in", value: "North Sea, globally", note: "Based in Norway, with UK hub in Aberdeen" },
  { icon: Leaf, label: "Emissions reduction", value: "Up to 90%", note: "Compared to traditional crewed vessels" },
  { icon: Zap, label: "ROV dive depth", value: "2,000 metres", note: "The underwater robot on each Reach Remote vessel" },
];

const timeline = [
  {
    year: "2013",
    title: "Reach Subsea founded",
    description: "The company was set up in Norway with a focus on providing subsea inspection and maintenance services using remotely operated vehicles (ROVs — underwater robots).",
  },
  {
    year: "2013–2020",
    title: "Building the business",
    description: "Grew steadily by winning contracts in the North Sea — inspecting pipelines, checking structures on the seabed, and maintaining offshore oil and gas infrastructure.",
  },
  {
    year: "2021–2023",
    title: "Expanding into new markets",
    description: "Started moving beyond oil and gas into offshore wind farms and carbon storage monitoring. Also acquired Octio and Monviro, two specialist companies focused on monitoring CO₂ stored underground beneath the seabed.",
  },
  {
    year: "2024",
    title: "Record revenues",
    description: "The company had its best financial year ever — NOK 2.7 billion in revenue. This was partly driven by growing demand for their services as energy companies invested heavily in inspection and maintenance.",
  },
  {
    year: "2025",
    title: "Reach Remote 1 & 2 delivered",
    description: "Two brand-new uncrewed surface vessels (boats with no crew on board) were delivered and began commercial operations. This was a major milestone — no other company was doing this kind of large-scale remote subsea work at the time.",
  },
  {
    year: "2025 (late)",
    title: "First fully remote operating permit",
    description: "Reach Remote 1 received official permission from the Norwegian Maritime Authorities to operate entirely without a support vessel nearby — the first time this had been approved for a vessel of this type.",
  },
];

const services = [
  {
    title: "Inspection, Maintenance, and Repair (IMR)",
    description: "This is the core business. Reach Subsea sends ROVs (underwater robots) to check, fix, and maintain structures that sit on the seabed — things like oil and gas pipelines, the legs of offshore platforms, and subsea valves. If something on the seafloor needs checking or fixing, Reach Subsea is one of the companies you'd call.",
    examples: ["Checking whether protective coatings on pipelines are still intact", "Testing the electrical systems that prevent corrosion", "Carrying out physical repairs on subsea equipment"],
  },
  {
    title: "Offshore Surveys",
    description: "Before building anything offshore — a wind turbine foundation, a new pipeline — you need to know exactly what the seabed looks like. Reach Subsea uses sonar and mapping equipment to create detailed images of the seafloor. This is where your Geophysics background is directly relevant — these are the same data types you've studied.",
    examples: ["Mapping the shape and geology of the seabed", "Detecting unexploded ordinance (old bombs/mines from wartime)", "Route planning for new cables and pipelines"],
  },
  {
    title: "Carbon Storage Monitoring",
    description: "Some energy companies are capturing CO₂ (a greenhouse gas) and pumping it underground beneath the seabed for permanent storage. Reach Subsea monitors whether this CO₂ is staying where it should be, using gravity sensors and seafloor instruments. This is a growing part of the business as the energy industry tries to reduce its climate impact.",
    examples: ["Gravity monitoring at the Sleipner and Snøhvit fields in Norway", "Seafloor subsidence tracking (checking the ground isn't sinking)", "Research projects on improving CO₂ storage monitoring methods"],
  },
  {
    title: "Offshore Renewables",
    description: "Wind farms at sea need exactly the same kind of inspection and maintenance as oil and gas infrastructure. Reach Subsea is growing this part of their business as more offshore wind farms are built in the North Sea.",
    examples: ["Inspecting the foundations of offshore wind turbines", "Cable route surveys", "Post-installation checks"],
  },
];

export default function AboutPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-14 pb-24">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <p className="text-sm font-semibold text-subsea-600 tracking-wider uppercase">Background Reading</p>
          <h1 className="text-3xl font-bold text-gray-900">Who Is Reach Subsea?</h1>
        </div>
      </div>

      {/* Plain summary */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-4">
        <p className="text-gray-700 leading-relaxed text-lg">
          Reach Subsea is a Norwegian company that does underwater inspection and maintenance work for the offshore energy industry. 
          In plain terms: they send robots to the bottom of the sea to check and fix things.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Their main clients are oil and gas companies, offshore wind operators, and increasingly, companies working on 
          carbon storage — all of which have valuable, complex infrastructure sitting on the seabed that needs to be 
          regularly inspected, repaired, and monitored.
        </p>
        <p className="text-gray-700 leading-relaxed">
          What makes Reach Subsea different from competitors is that they are leading the shift toward 
          <strong> doing this work without putting people at sea at all</strong>. Their newest vessels have no crew 
          — they're controlled from offices on shore. This is genuinely new and disruptive in their industry.
        </p>
      </section>

      {/* Key facts */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-gray-900">Key Facts at a Glance</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {keyFacts.map((fact, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <fact.icon className="w-6 h-6 text-subsea-500 mb-3" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{fact.label}</p>
              <p className="text-2xl font-bold text-subsea-900 mb-1">{fact.value}</p>
              <p className="text-sm text-gray-500">{fact.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What they actually do */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">What They Actually Do</h2>
        <div className="space-y-4">
          {services.map((svc, idx) => (
            <details key={idx} className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <summary className="px-6 py-5 font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between list-none">
                <span>{svc.title}</span>
                <span className="text-gray-400 group-open:rotate-90 transition-transform text-xl">›</span>
              </summary>
              <div className="px-6 pb-6 pt-2 space-y-4 border-t border-gray-100">
                <p className="text-gray-700 leading-relaxed">{svc.description}</p>
                <div>
                  <p className="text-xs font-bold text-subsea-600 uppercase tracking-wider mb-2">Examples of this work</p>
                  <ul className="space-y-1">
                    {svc.examples.map((ex, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-gray-700">
                        <span className="text-subsea-400 mt-0.5 flex-shrink-0">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* The big innovation */}
      <section className="bg-subsea-950 rounded-xl p-8 text-white space-y-5">
        <div className="flex items-center space-x-3">
          <Ship className="w-8 h-8 text-subsea-400" />
          <h2 className="text-2xl font-bold">The Reach Remote Project — Why It Matters</h2>
        </div>
        <p className="text-subsea-100 leading-relaxed">
          Historically, subsea inspection work required a large vessel with a crew of 20–40 people, 
          fuel costs for the ship, and all the safety and logistics that comes with having people at sea for weeks at a time. 
          This is expensive, slow, and produces a lot of CO₂ emissions.
        </p>
        <p className="text-subsea-100 leading-relaxed">
          Reach Subsea's answer to this is the <strong className="text-white">Reach Remote</strong> project — 
          two 23.9-metre vessels that operate with zero crew on board. A team in a Remote Operations Centre (ROC) 
          on shore controls everything via satellite and internet links. The vessel carries an underwater robot 
          (ROV) that can dive to 2,000 metres and do the actual inspection or repair work.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-2">
          {[
            { heading: "Up to 90% fewer emissions", detail: "Compared to a traditional crewed vessel doing the same job." },
            { heading: "30+ days at sea without port", detail: "More time working, fewer expensive trips back to harbour." },
            { heading: "No crew risk", detail: "Nobody is put in danger offshore. All the skilled work happens from a safe office." },
          ].map((item, i) => (
            <div key={i} className="bg-subsea-800 rounded-lg p-5 border border-subsea-700">
              <p className="font-bold text-white mb-1">{item.heading}</p>
              <p className="text-sm text-subsea-200">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">A Brief History</h2>
        <div className="relative pl-6 border-l-2 border-subsea-200 space-y-8">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-subsea-500 border-2 border-white shadow" />
              <p className="text-xs font-bold text-subsea-600 uppercase tracking-wider mb-1">{item.year}</p>
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aberdeen */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-3">
        <div className="flex items-center space-x-3 mb-2">
          <MapPin className="w-6 h-6 text-subsea-600" />
          <h2 className="text-2xl font-bold text-gray-900">The Aberdeen Office</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          The company's headquarters are in Haugesund, Norway — but for the role you're applying for, 
          the relevant office is in <strong>Aberdeen, Scotland</strong>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Aberdeen is the oil capital of the UK — most of the companies operating in the North Sea have their 
          UK base there. Reach Subsea recently moved to the <strong>H1 Building at the Hill of Rubislaw</strong> 
          in Aberdeen, which is a well-known business hub in the city, to better support their growing UK and 
          North Sea business.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Recent UK projects have included inspecting the anti-corrosion systems on an FPSO (a floating oil 
          production platform) — checking that the electrical system protecting the steel hull from rusting was 
          still working correctly.
        </p>
      </section>

      {/* Culture */}
      <section className="bg-subsea-50 rounded-xl border border-subsea-100 p-8 space-y-5">
        <div className="flex items-center space-x-3">
          <Users className="w-7 h-7 text-subsea-600" />
          <h2 className="text-2xl font-bold text-gray-900">The Company Culture</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Reach Subsea is explicit about what they value in people. Their three core values are:
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              value: "Learn",
              colour: "bg-blue-50 border-blue-200",
              titleColour: "text-blue-800",
              description: "They don't want people who think they already know everything. They want people who actively seek new knowledge, question established ways of doing things, and improve continuously.",
            },
            {
              value: "Teach",
              colour: "bg-green-50 border-green-200",
              titleColour: "text-green-800",
              description: "More experienced people are expected to actively support those with less experience — not just to lead by example but to directly help others grow. 'No one left behind' is taken seriously.",
            },
            {
              value: "Reach",
              colour: "bg-amber-50 border-amber-200",
              titleColour: "text-amber-800",
              description: "Set high goals and go after them. The company name is literally built around this idea. They want people with ambition — not reckless ambition, but the kind that drives you to deliver excellent work even when it's hard.",
            },
          ].map((v, i) => (
            <div key={i} className={`rounded-xl border p-5 ${v.colour}`}>
              <h3 className={`text-xl font-bold mb-2 ${v.titleColour}`}>{v.value}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed pt-2">
          The company has said publicly that when they hire, <strong>attitude and potential matter more to them than 
          experience</strong>. This is good news for a graduate — it means they genuinely want to develop people, 
          not just recruit someone who already knows everything.
        </p>
      </section>

      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-start space-x-4">
        <Anchor className="w-8 h-8 text-subsea-500 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Ready to go deeper?</h3>
          <p className="text-sm text-gray-600 mb-3">
            Now that you understand who Reach Subsea is, head to Step 1 to learn the specific technical 
            details about their vessels and operations — the things you'll need to mention in the interview.
          </p>
          <Link href="/module-1" className="inline-flex items-center text-sm font-semibold text-subsea-600 hover:text-subsea-800">
            Go to Step 1 — Know the Company →
          </Link>
        </div>
      </div>
    </div>
  );
}

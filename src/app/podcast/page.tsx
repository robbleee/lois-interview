"use client";

import React from "react";
import { ArrowLeft, Headphones, Clock, Mic } from "lucide-react";
import Link from "next/link";

export default function PodcastPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10 pb-24">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/" className="text-subsea-600 hover:text-subsea-800 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <p className="text-sm font-semibold text-subsea-600 tracking-wider uppercase">Listen</p>
          <h1 className="text-3xl font-bold text-gray-900">Podcast Episode</h1>
        </div>
      </div>

      {/* Episode card */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-subsea-950 px-8 py-10 flex items-start space-x-5">
          <div className="flex-shrink-0 bg-subsea-700 rounded-xl p-4">
            <Mic className="w-10 h-10 text-white" />
          </div>
          <div className="text-white">
            <p className="text-subsea-300 text-xs font-bold uppercase tracking-wider mb-2">Episode</p>
            <h2 className="text-2xl font-bold leading-snug mb-3">
              How Extreme Endurance Wins Offshore Engineering Jobs
            </h2>
            <div className="flex items-center space-x-4 text-subsea-300 text-sm">
              <span className="flex items-center space-x-1">
                <Headphones className="w-4 h-4" />
                <span>Interview Prep Series</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Listen at your own pace</span>
              </span>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            This episode is specifically made for your interview prep. It walks through how your 
            background in extreme endurance sport — mountain running, long races, competing internationally — 
            translates directly into the qualities Reach Subsea are looking for in an engineer.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Listen to it before your interview. It'll help you feel confident about your story 
            and give you new language to describe your experiences in a way engineers will understand.
          </p>

          {/* Audio player */}
          <div className="bg-subsea-50 rounded-xl p-6 border border-subsea-100">
            <p className="text-xs font-bold text-subsea-600 uppercase tracking-wider mb-3">Play episode</p>
            <audio
              controls
              className="w-full"
              preload="metadata"
            >
              <source src="/podcast.m4a" type="audio/mp4" />
              Your browser does not support the audio element. Try downloading the file directly.
            </audio>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-sm font-bold text-amber-800 mb-1">Tip — how to use this</p>
            <p className="text-sm text-amber-900 leading-relaxed">
              Listen once all the way through, then go through the modules on this site. 
              The episode introduces the framing; the modules give you the detail and let 
              you practise with quizzes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

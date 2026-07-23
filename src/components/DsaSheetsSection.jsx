import React, { useState, useEffect } from 'react';
import { DSA_SHEETS } from '../data/dsaSheetsData.js';
import { ExternalLink, BookOpen, Search, CheckCircle2, Bookmark, Sparkles, Star } from 'lucide-react';

export default function DsaSheetsSection({ onLaunchStudio }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [trackedSheets, setTrackedSheets] = useState(() => {
    try {
      const saved = localStorage.getItem('algoViz_tracked_sheets');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('algoViz_tracked_sheets', JSON.stringify(trackedSheets));
    } catch (e) {
      // Ignore storage errors
    }
  }, [trackedSheets]);

  const toggleTrack = (id) => {
    setTrackedSheets(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredSheets = DSA_SHEETS.filter(sheet => {
    const matchesSearch =
      sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sheet.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sheet.desc.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTag === 'All') return matchesSearch;
    if (selectedTag === 'Featured') return matchesSearch && sheet.featured;
    if (selectedTag === 'Tracked') return matchesSearch && trackedSheets.includes(sheet.id);
    return matchesSearch && sheet.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));
  });

  return (
    <section id="sheets" className="px-4 md:px-8 py-16 max-w-[1400px] mx-auto w-full border-t border-slate-800/80">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Student Interview Preparation Hub</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Top Curated DSA Sheets & Practice Roadmaps
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Access the most popular problem-solving sheets used by thousands of students to crack top tech company interviews.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px] md:min-w-[320px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sheet, author, or topic..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 transition font-sans"
          />
        </div>
      </div>

      {/* Filter Tags Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs no-scrollbar">
        {['All', 'Featured', 'Tracked', 'SDE Prep', 'Arrays', 'LeetCode', 'Trees'].map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {tag === 'Featured' && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
              {tag === 'Tracked' && <Bookmark className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{tag}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Sheet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSheets.map((sheet) => {
          const isTracked = trackedSheets.includes(sheet.id);

          return (
            <div
              key={sheet.id}
              className={`studio-card p-5 rounded-2xl border bg-gradient-to-br ${sheet.color} ${sheet.borderColor} hover:border-indigo-500/60 transition flex flex-col justify-between gap-4 group shadow-xl relative overflow-hidden`}
            >
              {/* Card Header Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800/80 text-indigo-300 w-fit">
                    {sheet.creator}
                  </span>
                  <h3 className="font-bold text-base text-white group-hover:text-indigo-200 transition mt-1">
                    {sheet.title}
                  </h3>
                </div>

                <button
                  onClick={() => toggleTrack(sheet.id)}
                  title={isTracked ? "Marked as Saved" : "Track Sheet"}
                  className={`p-2 rounded-xl border transition shrink-0 ${
                    isTracked
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                      : "bg-slate-950/60 border-slate-800/80 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isTracked ? "fill-emerald-400" : ""}`} />
                </button>
              </div>

              {/* Sheet Description */}
              <p className="text-slate-300 text-xs leading-relaxed">
                {sheet.desc}
              </p>

              {/* Tags & Count */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                  {sheet.count}
                </span>
                {sheet.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950/60 border border-slate-800/60 text-slate-400">
                    {t}
                  </span>
                ))}
              </div>

              {/* Card Bottom CTA Actions */}
              <div className="pt-3 border-t border-slate-800/80 text-xs">
                <a
                  href={sheet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md glow-indigo-subtle active:scale-95"
                >
                  <span>Open Full Sheet Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSheets.length === 0 && (
        <div className="p-12 text-center text-slate-500 text-xs bg-slate-950/60 rounded-2xl border border-slate-800 font-mono">
          No DSA sheets found matching your search. Try resetting filters!
        </div>
      )}
    </section>
  );
}

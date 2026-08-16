import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle, Trophy, Target, Code2 } from 'lucide-react';

export default function LeetCodeStats() {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('leetcode_username') || '';
  });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async (userToFetch) => {
    if (!userToFetch) return;
    
    setLoading(true);
    setError(null);
    setStats(null);
    localStorage.setItem('leetcode_username', userToFetch);

    try {
      // Primary API
      const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${userToFetch}`);
      const data = await res.json();

      if (data.status === 'success') {
        setStats(data);
      } else {
        throw new Error(data.message || 'User not found or API error');
      }
    } catch (err) {
      console.warn("Primary API failed, trying fallback...", err);
      try {
        // Fallback API (Alfa)
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/${userToFetch}/solved`);
        const data = await res.json();
        
        if (data && data.solvedProblem !== undefined) {
          // Normalize Alfa API response to match our expected format
          setStats({
            totalSolved: data.solvedProblem,
            totalQuestions: 3000, // Approximation if not provided
            easySolved: data.easySolved,
            totalEasy: 800,
            mediumSolved: data.mediumSolved,
            totalMedium: 1600,
            hardSolved: data.hardSolved,
            totalHard: 700,
          });
        } else {
          throw new Error('User not found in fallback API');
        }
      } catch (fallbackErr) {
        setError("Unable to fetch LeetCode stats. The public APIs might be rate-limited right now.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchStats(username);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStats(username);
  };

  const loadMockData = () => {
    setError(null);
    setStats({
      totalSolved: 482,
      totalQuestions: 3105,
      easySolved: 195,
      totalEasy: 802,
      mediumSolved: 243,
      totalMedium: 1642,
      hardSolved: 44,
      totalHard: 661
    });
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
          <Code2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-200">LeetCode Progress</h3>
          <p className="text-xs text-slate-400">Track your problem-solving journey</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter LeetCode username"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !username}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center min-w-[80px]"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch'}
        </button>
      </form>

      {error && (
        <div className="bg-rose-950/30 border border-rose-900/50 rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-start gap-2 text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
          <button 
            onClick={loadMockData}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-3 rounded-md self-start transition-colors"
          >
            Load Demo Profile Instead
          </button>
        </div>
      )}

      {stats && !error && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Total Solved Badge */}
          <div className="flex items-center justify-between bg-slate-950 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Solved</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{stats.totalSolved}</span>
                  <span className="text-xs text-slate-500">/ {stats.totalQuestions}</span>
                </div>
              </div>
            </div>
            <Target className="w-6 h-6 text-slate-700" />
          </div>

          {/* Difficulty Breakdown */}
          <div className="space-y-3">
            <DifficultyBar 
              label="Easy" 
              solved={stats.easySolved} 
              total={stats.totalEasy} 
              color="bg-emerald-500" 
              textColor="text-emerald-400"
            />
            <DifficultyBar 
              label="Medium" 
              solved={stats.mediumSolved} 
              total={stats.totalMedium} 
              color="bg-amber-500" 
              textColor="text-amber-400"
            />
            <DifficultyBar 
              label="Hard" 
              solved={stats.hardSolved} 
              total={stats.totalHard} 
              color="bg-rose-500" 
              textColor="text-rose-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DifficultyBar({ label, solved, total, color, textColor }) {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className={`${textColor} font-semibold`}>{label}</span>
        <span className="text-slate-400 font-mono">
          <span className="text-slate-200">{solved}</span> / {total}
        </span>
      </div>
      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${Math.max(percentage, 1)}%` }}
        />
      </div>
    </div>
  );
}

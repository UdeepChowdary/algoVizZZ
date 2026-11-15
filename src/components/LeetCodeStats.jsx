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
    <div className="bg-[#171e19] border border-[#35413b] rounded-2xl p-6 shadow-xl w-full text-[#e8ece4]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#c9583c]/15 border border-[#c9583c]/30 flex items-center justify-center text-[#ffad8e]">
          <Code2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#f5f4ed]">LeetCode Progress</h3>
          <p className="text-xs text-[#a0aaa2]">Track your problem-solving journey</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707b73]" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter LeetCode username"
            className="w-full bg-[#111815] border border-[#35413b] rounded-lg py-2 pl-9 pr-4 text-sm text-[#f5f4ed] placeholder:text-[#707b73] focus:outline-none focus:border-[#c9583c]/60 focus:ring-1 focus:ring-[#c9583c]/60 transition-all font-sans"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !username}
          className="bg-[#c9583c] hover:bg-[#b54b31] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center min-w-[80px]"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch'}
        </button>
      </form>

      {error && (
        <div className="bg-[#2a1310] border border-[#6b261b] rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-start gap-2 text-[#ff9888] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
          <button 
            onClick={loadMockData}
            className="text-xs bg-[#111815] hover:bg-[#202b26] text-[#d5dbd3] border border-[#35413b] py-1.5 px-3 rounded-md self-start transition-colors"
          >
            Load Demo Profile Instead
          </button>
        </div>
      )}

      {stats && !error && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Total Solved Badge */}
          <div className="flex items-center justify-between bg-[#111815] rounded-xl p-4 border border-[#303a35]">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-[#d4ec7a]" />
              <div>
                <div className="text-xs font-semibold text-[#a0aaa2] uppercase tracking-wider">Total Solved</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#ffffff]">{stats.totalSolved}</span>
                  <span className="text-xs text-[#a0aaa2]">/ {stats.totalQuestions}</span>
                </div>
              </div>
            </div>
            <Target className="w-6 h-6 text-[#35413b]" />
          </div>

          {/* Difficulty Breakdown */}
          <div className="space-y-3">
            <DifficultyBar 
              label="Easy" 
              solved={stats.easySolved} 
              total={stats.totalEasy} 
              color="bg-[#d4ec7a]" 
              textColor="text-[#d4ec7a]"
            />
            <DifficultyBar 
              label="Medium" 
              solved={stats.mediumSolved} 
              total={stats.totalMedium} 
              color="bg-[#ffad8e]" 
              textColor="text-[#ffad8e]"
            />
            <DifficultyBar 
              label="Hard" 
              solved={stats.hardSolved} 
              total={stats.totalHard} 
              color="bg-[#f87171]" 
              textColor="text-[#f87171]"
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
        <span className="text-[#a0aaa2] font-mono">
          <span className="text-[#f5f4ed] font-semibold">{solved}</span> / {total}
        </span>
      </div>
      <div className="h-2 w-full bg-[#111815] rounded-full overflow-hidden border border-[#303a35]">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${Math.max(percentage, 1)}%` }}
        />
      </div>
    </div>
  );
}

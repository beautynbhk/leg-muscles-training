"use client";

import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

const STAGES = [
  { id: 1, title: "Stage 1: Release", exercises: [{ id: '1-1', name: "Calf Foam Roll", detail: "2-3 mins", timer: 120 }, { id: '1-2', name: "Glute Release", detail: "60s", timer: 60 }] },
  { id: 2, title: "Stage 2: Activation", exercises: [{ id: '2-1', name: "Leg Lift", detail: "15x3", timer: 5 }, { id: '2-2', name: "Band Walk", detail: "15x3", timer: 30 }] },
  { id: 3, title: "Stage 3: Integration", exercises: [{ id: '3-1', name: "Banded Squat", detail: "15x3", timer: 60 }, { id: '3-2', name: "Single RDL", detail: "12x3", timer: 60 }] }
];

export default function RehabApp() {
  const [view, setView] = useState('home');
  const [stage, setStage] = useState(null);
  const [prog, setProg] = useState({});
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem('rehab-p');
    if (s) setProg(JSON.parse(s));
  }, []);

  useEffect(() => {
    let itv;
    if (run && time > 0) {
      itv = setInterval(() => setTime(t => t - 1), 1000);
    } else {
      setRun(false);
    }
    return () => clearInterval(itv);
  }, [run, time]);

  if (view === 'home') {
    return (
      <div className="max-w-md mx-auto bg-slate-50 min-h-screen p-6 font-sans">
        <div className="p-6 bg-blue-600 text-white rounded-2xl shadow-lg mb-6">
          <h1 className="text-xl font-bold">Lower Limb Rehab</h1>
          <p className="text-sm opacity-80">Right Side Plan</p>
        </div>
        {STAGES.map(s => (
          <button key={s.id} onClick={()=>{setStage(s); setView('list')}} className="w-full bg-white p-5 rounded-xl mb-4 shadow-sm flex justify-between items-center border">
            <span className="font-bold text-slate-800">{s.title}</span>
            <Icons.ChevronRight size={20} className="text-blue-500" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="p-4 border-b flex items-center gap-4">
        <button onClick={()=>setView('home')} className="p-2"><Icons.ChevronLeft /></button>
        <span className="font-bold">{stage?.title}</span>
      </div>
      <div className="p-4 space-y-4">
        {stage?.exercises.map(ex => (
          <div key={ex.id} className="p-5 border rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg text-slate-800">{ex.name}</h3>
                <span className="text-blue-600 text-sm font-bold">{ex.detail}</span>
              </div>
              <button onClick={()=>{const n={...prog,[ex.id]:!prog[ex.id]}; setProg(n); localStorage.setItem('rehab-p',JSON.stringify(n))}}>
                <Icons.CheckCircle className={prog[ex.id] ? "text-green-500" : "text-slate-200"} size={28} />
              </button>
            </div>
            <button onClick={()=>{setTime(ex.timer); setRun(true)}} className="w-full py-3 bg-slate-900 text-white rounded-xl flex justify-center items-center gap-2 mt-2">
              {run && time > 0 ? <><Icons.Clock size={18}/> {time}s</> : <><Icons.Play size={18} fill="currentColor"/> Start</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, CheckCircle, Calendar, Clock } from 'lucide-react';

const STAGES = [
  { id: 1, title: "階段 1: 放鬆", exercises: [{ id: '1-1', name: "小腿放鬆", detail: "2-3min", timer: 120 }, { id: '1-2', name: "髖部放鬆", detail: "60s", timer: 60 }] },
  { id: 2, title: "階段 2: 激活", exercises: [{ id: '2-1', name: "側躺抬腿", detail: "15x3", timer: 5 }, { id: '2-2', name: "彈力帶走", detail: "15x3", timer: 30 }, { id: '2-3', name: "骨盆控制", detail: "12x3", timer: 45 }] },
  { id: 3, title: "階段 3: 整合", exercises: [{ id: '3-1', name: "彈力帶蹲", detail: "15x3", timer: 60 }, { id: '3-2', name: "單腳RDL", detail: "12x3", timer: 60 }] }
];

export default function App() {
  const [view, setView] = useState('home');
  const [stage, setStage] = useState(null);
  const [prog, setProg] = useState({});
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem('rehab-data');
    if (s) setProg(JSON.parse(s));
  }, []);

  useEffect(() => {
    let t;
    if (run && time > 0) t = setInterval(() => setTime(prev => prev - 1), 1000);
    else setRun(false);
    return () => clearInterval(t);
  }, [run, time]);

  if (view === 'home') return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 p-6">
      <div className="bg-blue-600 p-6 rounded-2xl text-white mb-6">
        <h1 className="text-xl font-bold">右側下肢矯正 App</h1>
        <p className="text-sm opacity-80">Daily Training Plan</p>
      </div>
      {STAGES.map(s => (
        <button key={s.id} onClick={()=>{setStage(s); setView('list')}} className="w-full bg-white p-5 rounded-xl mb-4 shadow-sm flex justify-between border">
          <span className="font-bold">{s.title}</span>
          <ChevronLeft className="rotate-180" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <div className="p-4 border-b flex items-center gap-4">
        <button onClick={()=>setView('home')}><ChevronLeft /></button>
        <span className="font-bold">{stage?.title}</span>
      </div>
      <div className="p-4 space-y-4">
        {stage?.exercises.map(ex => (
          <div key={ex.id} className="p-4 border rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{ex.name}</h3>
              <button onClick={()=>{const n={...prog,[ex.id]:!prog[ex.id]}; setProg(n); localStorage.setItem('rehab-data',JSON.stringify(n))}}>
                <CheckCircle className={prog[ex.id] ? "text-green-500" : "text-gray-200"} size={28} />
              </button>
            </div>
            <p className="text-blue-600 text-sm mb-3">{ex.detail}</p>
            <button onClick={()=>{setTime(ex.timer); setRun(true)}} className="w-full py-3 bg-slate-900 text-white rounded-lg flex justify-center items-center gap-2">
              {run && time > 0 ? <><Clock size={16}/> {time}s</> : <><Play size={16}/> Start</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, CheckCircle, Calendar, AlertCircle, Clock } from 'lucide-react';

const STAGES = [
  {
    id: 1,
    title: "階段 1：放鬆與輕激活",
    desc: "緩解外側緊張",
    exercises: [
      { id: '1-1', name: "小腿外側滾筒放鬆", detail: "2-3 分鐘", target: "停留 20-30 秒/處", timer: 120 },
      { id: '1-2', name: "髖外側/臀中肌放鬆", detail: "90/90 輕拉", target: "每側 60 秒", timer: 60 }
    ]
  },
  {
    id: 2,
    title: "階段 2：核心激活與控制",
    desc: "強化臀中肌，穩定膝蓋",
    exercises: [
      { id: '2-1', name: "側躺抬腿", detail: "15次 x 3組", target: "抬2停1放2", timer: 5 },
      { id: '2-2', name: "彈力帶側走", detail: "15步 x 3組", target: "膝蓋外推", timer: 30 },
      { id: '2-3', name: "單腳站立骨盆控制", detail: "12次 x 3組", target: "右腳站立拉回", timer: 45 }
    ]
  },
  {
    id: 3,
    title: "階段 3：整合功能動作",
    desc: "整合發力模式",
    exercises: [
      { id: '3-1', name: "彈力帶深蹲", detail: "15次 x 3組", target: "膝蓋對準腳趾", timer: 60 },
      { id: '3-2', name: "單腳 RDL", detail: "12次 x 3組", target: "微外旋拉伸", timer: 60 }
    ]
  }
];

export default function RehabApp() {
  const [view, setView] = useState('home');
  const [stage, setStage] = useState(null);
  const [pain, setPain] = useState(5);
  const [prog, setProg] = useState({});
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem('rehab-p');
    if (s) setProg(JSON.parse(s));
  }, []);

  const toggle = (id) => {
    const n = { ...prog, [id]: !prog[id] };
    setProg(n);
    localStorage.setItem('rehab-p', JSON.stringify(n));
  };

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
      <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-10">
        <div className="p-8 bg-blue-600 text-white rounded-b-3xl shadow-lg">
          <h1 className="text-2xl font-bold">右側下肢矯正</h1>
          <div className="mt-4 bg-white/20 p-3 rounded-xl flex items-center gap-2 text-sm"><Calendar size={16}/>今日：階段 2</div>
        </div>
        <div className="p-5">
          <div className="bg-white p-5 rounded-2xl shadow-sm mb-6 border">
            <p className="font-bold text-slate-700 mb-2">酸脹程度: {pain}</p>
            <input type="range" min="0" max="10" value={pain} onChange={(e)=>setPain(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>
          {STAGES.map(s => (
            <button key={s.id} onClick={()=>{setStage(s); setView('list')}} className="w-full bg-white p-5 rounded-2xl mb-4 shadow-sm flex justify-between items-center border hover:bg-gray-50 transition-colors">
              <div className="text-left"><b className="block text-slate-800">{s.title}</b><small className="text-slate-400">{s.desc}</small></div>
              <ChevronLeft className="rotate-180 text-blue-500" size={20} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen pb-10 font-sans text-slate-900">
      <div className="p-4 bg-white flex items-center justify-between sticky top-0 shadow-sm border-b">
        <button onClick={()=>setView('home')} className="p-2"><ChevronLeft size={24} /></button>
        <h2 className="font-bold text-slate-800 text-lg">{stage?.title}</h2>
        <div className="w-10"></div>
      </div>
      <div className

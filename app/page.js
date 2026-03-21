"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, CheckCircle, Calendar, AlertCircle, Clock } from 'lucide-react';

const STAGES = [
  {
    id: 1,
    title: "階段 1：放鬆與輕激活",
    desc: "緩解外側緊張，喚醒感知",
    exercises: [
      { id: '1-1', name: "小腿外側滾筒放鬆", detail: "2-3 分鐘", target: "停留 20-30 秒", timer: 120 },
      { id: '1-2', name: "髖外側/臀中肌放鬆", detail: "90/90 輕拉", target: "每側 60 秒", timer: 60 }
    ]
  },
  {
    id: 2,
    title: "階段 2：核心激活與控制",
    desc: "強化臀中肌，穩定膝蓋",
    exercises: [
      { id: '2-1', name: "側躺抬腿", detail: "10-15次 x 3組", target: "抬2停1放2", timer: 5 },
      { id: '2-2', name: "彈力帶側走", detail: "10-15步 x 3組", target: "膝蓋外推", timer: 30 },
      { id: '2-3', name: "單腳站立骨盆控制", detail: "10-12次 x 3組", target: "右腳站立拉回", timer: 45 }
    ]
  },
  {
    id: 3,
    title: "階段 3：整合功能動作",
    desc: "動態整合，正確發力",
    exercises: [
      { id: '3-1', name: "彈力帶深蹲", detail: "12-15次 x 3組", target: "膝蓋對準腳趾", timer: 60 },
      { id: '3-2', name: "單腳 RDL", detail: "8-12次 x 3組", target: "微外旋，感受拉伸", timer: 60 }
    ]
  }
];

export default function RehabApp() {
  const [view, setView] = useState('home');
  const [selectedStage, setSelectedStage] = useState(null);
  const [pain, setPain] = useState(5);
  const [progress, setProgress] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rehab-v1');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const handleComplete = (id) => {
    const newP = { ...progress, [id]: !progress[id] };
    setProgress(newP);
    localStorage.setItem('rehab-v1', JSON.stringify(newP));
  };

  useEffect(() => {
    let timer;
    if (timerOn && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else {
      setTimerOn(false);
    }
    return () => clearInterval(timer);
  }, [timerOn, timeLeft]);

  if (view === 'home') {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-10">
        <div className="p-8 bg-blue-600 text-white rounded-b-3xl">
          <h1 className="text-xl font-bold">右側下肢矯正</h1>
          <div className="mt-4 bg-white/20 p-3 rounded-xl flex items-center gap-2 text-sm">
            <Calendar size={16} /> 推薦：階段 2
          </div>
        </div>
        <div className="p-5">
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <p className="text-sm font-bold mb-2">腳踝酸脹度: {pain}</p>
            <input type="range" min="0" max="10" value={pain} onChange={(e)=>setPain(e.target.value)} className="w-full" />
          </div>
          {STAGES.map(s => (
            <button key={s.id} onClick={()=>{setSelectedStage(s); setView('stage')}} className="w-full bg-white p-4 rounded-xl mb-3 shadow-sm flex justify-between items-center">
              <span className="font-bold text-gray-700">{s.title}</span>
              <ChevronLeft className="rotate-180 text-gray-400" size={18} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-100 pb-10">
      <div className="p-4 bg-white flex items-center gap-4 sticky top-0 shadow-sm">
        <button onClick={()=>setView('home')}><ChevronLeft /></button>
        <h2 className="font-bold">{selectedStage.title}</h2>
      </div>
      <div className="p-4 space-y-4">
        {selectedStage.exercises.map(ex => (
          <div key={ex.id} className="bg-white p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-lg">{ex.name}</h3>
              <button onClick={()=>handleComplete(ex.id)}>
                <CheckCircle className={progress[ex.id] ? "text-green-500" : "text-gray-200"} size={28} />
              </button>
            </div>
            <p className="text-blue-600 font-bold text-sm mb-1">{ex.detail}</p>
            <p className="text-gray-400 text-xs mb-4">{ex.target}</p>
            <button 
              onClick={() => {setTimeLeft(ex.timer); setTimerOn(true);}}
              className="w-full py-3 rounded-xl font-bold bg-gray-900 text-white flex justify-center gap-2 items-center"
            >
              {timerOn && timeLeft > 0 ? <><Clock size={16} /> {timeLeft}s</> : <><Play size={16} /> 開始</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

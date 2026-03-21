"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, CheckCircle, Calendar, AlertCircle, Clock } from 'lucide-react';

// 1. 定義資料庫 (確保結構閉合)
const STAGES = [
  {
    id: 1,
    title: "階段 1：放鬆與輕激活",
    desc: "緩解外側緊張，喚醒關節感知",
    exercises: [
      { id: '1-1', name: "小腿外側滾筒放鬆", detail: "2-3 分鐘", target: "停留 20-30 秒/處", timer: 120 },
      { id: '1-2', name: "髖外側/臀中肌放鬆", detail: "90/90 坐姿輕拉", target: "每側 60 秒", timer: 60 }
    ]
  },
  {
    id: 2,
    title: "階段 2：核心激活與控制",
    desc: "強化臀中肌，穩定骨盆與膝蓋",
    exercises: [
      { id: '2-1', name: "側躺抬腿", detail: "10-15次 x 3組", target: "節奏：抬2停1放2", timer: 5 },
      { id: '2-2', name: "彈力帶側走", detail: "10-15步 x 3組", target: "膝蓋保持外推，不內扣", timer: 30 },
      { id: '2-3', name: "單腳站立骨盆控制", detail: "10-12次 x 3組", target: "右腳站立，骨盆拉回水平", timer: 45 }
    ]
  },
  {
    id: 3,
    title: "階段 3：整合功能動作",
    desc: "動態鏈整合，強化正確發力模式",
    exercises: [
      { id: '3-1', name: "彈力帶深蹲", detail: "12-15次 x 3組", target: "膝蓋對準第二腳趾", timer: 60 },
      { id: '3-2', name: "單腳 RDL", detail: "8-12次 x 3組", target: "微外旋，感受臀部拉伸", timer: 60 }
    ]
  }
];

export default function RehabApp() {
  // 2. 宣告所有必要的狀態
  const [currentView, setCurrentView] = useState('home');
  const [selectedStage, setSelectedStage] = useState(null);
  const [painLevel, setPainLevel] = useState(5);
  const [progress, setProgress] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // 3. 讀取與儲存進度
  useEffect(() => {
    const saved = localStorage.getItem('rehab-progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const toggleComplete = (id) => {
    const newProg = { ...progress, [id]: !progress[id] };
    setProgress(newProg);
    localStorage.setItem('rehab-progress', JSON.stringify(newProg));
  };

  // 4. 計時器邏輯
  const startTimer = (seconds) => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      setTimeLeft(0);
    } else {
      setTimeLeft(seconds);
      setIsTimerRunning(true);
    }
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // 5. 渲染首頁
  if (currentView === 'home') {
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-10 font-sans text-slate-900">
        <div className="p-8 bg-blue-600 text-white rounded-b-[40px] shadow-lg">
          <h1 className="text-2xl font-bold">右側下肢矯正</h1>
          <p className="mt-2 opacity-80 text-sm">穩定膝蓋 · 靈活骨盆 · 減輕酸脹</p>
          <div className="mt-6 bg-white/10 p-4 rounded-2xl flex items-center gap-4 border border-white/20">
            <Calendar size={20} />
            <p className="text-sm font-medium">今日推薦：階段 2 強化訓練</p>
          </div>
        </div>

        <div className="p-5 -mt-6">
          <div className="bg-white p-5 rounded-2xl shadow-md mb-6">
            <h3 className="flex items-center gap-2 font-bold text-gray-700 mb-4">
              <AlertCircle size={18} className="text-orange-500" />
              右腳踝酸脹程度 (0-10)
            </h3>
            <input 
              type="range" min="0" max="10" value={painLevel} 
              onChange={(e) => setPainLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
              <span>輕鬆 (0)</span>
              <span className="text-blue-600 text-lg font-bold">{painLevel}</span>
              <span>極度酸脹 (10)</span>
            </div>
          </div>

          <h2 className="font-bold text-gray-800 mb-4 ml-1 text-lg">選擇訓練階段</h2>
          <div className="space-y-4">
            {STAGES.map(stage => (
              <button 
                key={stage.id}
                onClick={() => { setSelectedStage(stage); setCurrentView('stage'); }}
                className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:border-blue-300 transition-all text-left"
              >
                <div>
                  <h4 className="font-bold text-gray-800">{stage.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{stage.desc}</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                  <ChevronLeft className="rotate-180" size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 6. 渲染階段動作清單
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-10 text-slate-900 font-sans">
      <div className="flex items-center p-4 bg-white border-b sticky top-0 z-10 justify-between">
        <button onClick={() => {setCurrentView('home'); setIsTimerRunning(false); setTimeLeft(0);}} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">{selectedStage?.title}</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-6">
        {selectedStage?.exercises.map(ex => (
          <div key={ex.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font

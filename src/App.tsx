/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Checkbox labels as per the screenshot
const OPTIONS = ["Nam", "Nữ", "Khác"];

export default function App() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    Nam: true, // Default as per screenshot 1
    Nữ: false,
    Khác: false,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Function to toggle checkbox
  const toggleCheckbox = (label: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Function to show toast
  const handleCheck = () => {
    const selected = OPTIONS.filter((opt) => checkedItems[opt]);
    if (selected.length === 0) {
      setToastMessage("Bạn chưa check vào ô nào");
    } else {
      // Replicate the text style from the screenshot
      // "Bạn đã check vào Nam" or "Đã check Nam Đã check Nữ"
      if (selected.length === 1) {
        setToastMessage(`Bạn đã check vào ${selected[0]}`);
      } else {
        const message = selected.map((s) => `Đã check ${s}`).join(" ");
        setToastMessage(message);
      }
    }
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center font-sans p-4" id="page-wrapper">
      {/* Mobile Device Simulation */}
      <div 
        className="w-full max-w-[360px] h-[720px] bg-[#121212] rounded-[48px] border-[8px] border-[#2A2A2A] relative flex flex-col shadow-2xl overflow-hidden" 
        id="android-device-simulation"
      >
        {/* Status Bar */}
        <div className="h-10 px-8 flex justify-between items-center text-[10px] text-gray-400 select-none" id="status-bar">
          <span>12:30 PM</span>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Header */}
        <header className="px-8 py-6 mb-2" id="app-header">
          <h1 className="text-white text-2xl font-semibold tracking-tight">Demo CheckBox</h1>
          <p className="text-gray-500 text-sm mt-1">Chọn các tùy chọn phù hợp với bạn</p>
        </header>

        {/* Main Content (Scrollable list area) */}
        <main className="flex-1 px-6 space-y-3 overflow-y-auto" id="main-content">
          {OPTIONS.map((option) => (
            <div
              key={option}
              onClick={() => toggleCheckbox(option)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                checkedItems[option] 
                  ? "bg-[#1E1E1E] border-blue-900/30 shadow-inner" 
                  : "bg-[#1E1E1E] border-[#333] hover:border-[#444]"
              }`}
              id={`item-container-${option}`}
            >
              <div className="flex flex-col">
                <span className={`font-medium text-sm transition-colors ${checkedItems[option] ? "text-white" : "text-gray-400"}`}>
                  Lựa chọn: {option}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5">Mô tả chi tiết cho {option}</span>
              </div>

              {/* Checkbox Icon */}
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
                  checkedItems[option]
                    ? "bg-blue-600 scale-105"
                    : "border-2 border-[#444] bg-transparent"
                }`}
                id={`checkbox-${option}`}
              >
                {checkedItems[option] && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    className="w-4 h-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                )}
              </div>
            </div>
          ))}
        </main>

        {/* Action Button Area */}
        <div className="p-8 pb-12" id="button-area">
          <button
            onClick={handleCheck}
            className="w-full bg-white hover:bg-gray-100 active:scale-[0.98] text-black font-bold py-4 rounded-2xl shadow-xl transition-all uppercase tracking-wider text-sm"
            id="check-button"
          >
            KIỂM TRA
          </button>
        </div>

        {/* Toast Notification */}
        <div className="absolute bottom-32 left-0 right-0 flex justify-center pointer-events-none px-6" id="toast-wrapper">
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#323232] border border-[#444] text-gray-100 text-[13px] px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 pointer-events-auto"
                id="toast-notification"
              >
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                {toastMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-700/50 rounded-full" id="home-indicator"></div>
      </div>

      {/* Desktop Background Designs */}
      <div className="absolute top-20 right-20 w-64 text-right hidden lg:block select-none pointer-events-none">
        <h2 className="text-white/5 text-4xl font-black uppercase tracking-tighter leading-none">Elegant<br/>Dark UI</h2>
        <p className="text-white/10 text-xs mt-4 italic">Item selection simulation with system feedback.</p>
      </div>
    </div>
  );
}

import React from 'react'
import { Crown, Play, Star, Trophy, Clock, FileCheck } from 'lucide-react'

export default function FinalExamView({ onExamClick }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simulator Card - Paid/Premium */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl text-white group cursor-pointer hover:shadow-2xl transition-all duration-300" onClick={() => onExamClick('simulator')}>
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-yellow-500/20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl -ml-12 -mb-12" />

          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-yellow-400/20">
                      <Crown className="w-3.5 h-3.5" />
                      Premium
                    </div>
                    {/* Enhanced "Real Exam" badge */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 blur-sm opacity-50 animate-pulse rounded-full"></div>
                      <span className="relative z-10 text-xs font-bold text-white bg-red-500/20 border border-red-500/50 px-3 py-1 rounded-full">
                        Əsl imtahan təcrübəsi
                      </span>
                    </div>
                </div>

                <h3 className="text-3xl font-black mb-3 text-white tracking-tight">SINAQ DYP İMTAHANI</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm font-medium">
                  DYP imtahanındakı kimi real vaxt rejimi və sual ardıcıllığı.
                  Özünüzü real imtahanda hiss edin.
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-gray-900 flex items-center justify-center shadow-lg shadow-yellow-400/20 animate-pulse transform group-hover:scale-110 transition-transform duration-300">
                <Star className="w-7 h-7 fill-current" />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-center gap-5 text-sm text-gray-300 font-medium">
                <span className="flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-yellow-400" /> 15 dəqiqə
                </span>
                <span className="flex items-center gap-2">
                  <FileCheck className="w-4.5 h-4.5 text-yellow-400" /> 10 sual
                </span>
              </div>

              <div className="flex flex-col items-end gap-2">
                 {/* Price Block */}
                 <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-xl shadow-inner">
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Endirim</span>
                      <span className="text-gray-400 text-sm font-bold line-through decoration-red-500 decoration-2 opacity-60">
                        5 ₼
                      </span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10 mx-1"></div>
                    <span className="text-yellow-400 text-2xl font-black drop-shadow-sm">
                      2 ₼
                    </span>
                 </div>

                 <button
                  className="w-full bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-colors shadow-lg flex items-center justify-center gap-2"
                 >
                  Başla <Play className="w-4 h-4 fill-current ml-1" />
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Final Exam - Free */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border border-gray-100 group hover:shadow-card transition-all duration-300 cursor-pointer" onClick={() => onExamClick('final')}>
          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-100">
                  Ödənişsiz
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Yekun İmtahan</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  Bütün mövzuları əhatə edən qarışıq suallar. Biliklərinizi yoxlamaq üçün idealdır.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Trophy className="w-6 h-6" />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> 15 dəqiqə
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4" /> 10 sual
                </span>
              </div>

              <button
                className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-primary-600 transition-colors shadow-lg flex items-center gap-2"
              >
                Başla <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {[
          { label: 'Keçid balı', value: '9/10', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Vaxt', value: '15 dəq', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Cəhdlər', value: 'Limitsiz', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center">
            <span className="text-gray-500 text-xs font-medium mb-1">{stat.label}</span>
            <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

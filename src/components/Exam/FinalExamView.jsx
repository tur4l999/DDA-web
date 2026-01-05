import React from 'react'
import { Crown, Play, Star, Trophy, Clock, FileCheck } from 'lucide-react'

export default function FinalExamView({ onExamClick }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simulator Card - Paid/Premium */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl text-white group">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-yellow-500/20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl -ml-12 -mb-12" />

          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-yellow-400/30">
                  <Crown className="w-3.5 h-3.5" />
                  Premium
                </div>
                <h3 className="text-2xl font-bold mb-2">İmtahan Simulyatoru</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                  DYP imtahanındakı kimi real vaxt rejimi və sual ardıcıllığı.
                  Özünüzü real imtahanda hiss edin.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-gray-900 flex items-center justify-center shadow-lg shadow-yellow-400/20 animate-pulse">
                <Star className="w-6 h-6 fill-current" />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> 15 dəqiqə
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4" /> 10 sual
                </span>
              </div>

              <button
                onClick={() => onExamClick('simulator')}
                className="bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-yellow-400 transition-colors shadow-lg flex items-center gap-2"
              >
                Başla (1 ₼) <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Standard Final Exam - Free */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border border-gray-100 group hover:shadow-card transition-all duration-300">
          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  Ödənişsiz
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Yekun İmtahan</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  Bütün mövzuları əhatə edən qarışıq suallar. Biliklərinizi yoxlamaq üçün idealdır.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
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
                onClick={() => onExamClick('final')}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-600 transition-colors shadow-lg flex items-center gap-2"
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

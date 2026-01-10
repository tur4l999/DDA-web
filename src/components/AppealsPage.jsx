import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, Clock, XCircle, MessageSquare, User, GraduationCap, Search } from 'lucide-react';

const appealsData = [
  {
    id: 1,
    ticketNumber: 5,
    questionNumber: 3,
    date: '12.03.2024',
    status: 'pending',
    userMessage: 'Məncə burada B variantı düzgündür, çünki nişanın təsir dairəsi yolayrıcına qədərdir. Sualda göstərilən vəziyyətdə sürücü ötmə əməliyyatını yerinə yetirə bilər.',
    teacherResponse: null
  },
  {
    id: 2,
    ticketNumber: 12,
    questionNumber: 8,
    date: '10.03.2024',
    status: 'rejected',
    userMessage: 'Sürət rejimi ilə bağlı sual səhvdir. Yaşayış zonasında 20 km/saat olmalıdır, lakin cavabda 50 km/saat götürülüb.',
    teacherResponse: 'Xeyr, diqqətlə baxsanız şəkildə "Yaşayış zonası" (5.51) nişanı yoxdur. Bu ərazi "Yaşayış məntəqəsi" (5.22) nişanı ilə işarələnib və orada maksimal sürət 60 km/saatdır. Zəhmət olmasa nişanların fərqinə diqqət yetirin.'
  },
  {
    id: 3,
    ticketNumber: 1,
    questionNumber: 20,
    date: '08.03.2024',
    status: 'approved',
    userMessage: 'Şəkildəki avtomobilin dönmə işığı yanıb, amma cavabda düzünə hərəkət qeyd olunub. Bu sualın cavabı texniki səhv kimi görünür.',
    teacherResponse: 'Tamamilə haqlısınız! Texniki səhv aşkarlandı və dərhal düzəliş edildi. Diqqətiniz üçün təşəkkür edirik. Sizin kimi diqqətli tələbələr bizə sistemi daha da yaxşılaşdırmağa kömək edir.'
  },
  {
    id: 4,
    ticketNumber: 8,
    questionNumber: 15,
    date: '05.03.2024',
    status: 'approved',
    userMessage: 'Sualın izahında qeyd olunan maddə köhnə qaydalara əsaslanır. Yeni qaydalara görə bu vəziyyət fərqli tənzimlənir.',
    teacherResponse: 'Təşəkkürlər. Qanunvericilikdə edilən son dəyişikliklərə əsasən sualın izahı yeniləndi.'
  }
];

export default function AppealsPage({ onBack }) {
  const [filter, setFilter] = useState('all'); // all, pending, resolved

  const filteredAppeals = appealsData.filter(appeal => {
    if (filter === 'all') return true;
    if (filter === 'pending') return appeal.status === 'pending';
    if (filter === 'resolved') return ['approved', 'rejected'].includes(appeal.status);
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-100">
            <Clock className="w-3.5 h-3.5" />
            Gözləmədə
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Qəbul edildi
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
            <XCircle className="w-3.5 h-3.5" />
            Rədd edildi
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Müraciətlərim</h1>
              <p className="text-sm text-gray-500 font-medium">Sual və cavablarla bağlı göndərdiyiniz appelyasiyalar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Filters */}
          <div className="flex items-center gap-2 p-1 bg-gray-200/50 rounded-xl w-fit">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              Hamısı
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'pending'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              Gözləmədə
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === 'resolved'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
            >
              Cavablandırıldı
            </button>
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredAppeals.map((appeal) => (
              <div
                key={appeal.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">Bilet {appeal.ticketNumber}, Sual {appeal.questionNumber}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{appeal.date}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(appeal.status)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-6">
                  {/* User Message */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sizin müraciətiniz</span>
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {appeal.userMessage}
                      </p>
                    </div>
                  </div>

                  {/* Teacher Response */}
                  {appeal.teacherResponse && (
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100 -mt-6 -mb-6"></div>
                      <div className="flex gap-4 relative">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center border border-primary-100 shadow-sm shadow-primary-100">
                            <GraduationCap className="w-4 h-4 text-primary-600" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider flex items-center gap-2">
                            Müəllimin cavabı
                            {appeal.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </span>
                          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-800 leading-relaxed border border-gray-100/80">
                            {appeal.teacherResponse}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Empty state for pending */}
                  {!appeal.teacherResponse && appeal.status === 'pending' && (
                     <div className="ml-12 p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 text-center">
                        <p className="text-sm text-gray-400 italic">Müraciətiniz araşdırılır. Tezliklə müəllim tərəfindən cavablandırılacaq.</p>
                     </div>
                  )}
                </div>
              </div>
            ))}

            {filteredAppeals.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Müraciət tapılmadı</h3>
                <p className="text-gray-500 max-w-xs mx-auto mt-2">Bu kateqoriyada heç bir appelyasiya müraciətiniz yoxdur.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

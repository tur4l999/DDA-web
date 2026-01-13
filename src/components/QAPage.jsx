import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  Send,
  Image as ImageIcon,
  ChevronLeft,
  MoreVertical,
  Check,
  CheckCheck,
  Paperclip,
  X
} from 'lucide-react';

// Mock Data
const INITIAL_QUESTIONS = [
  {
    id: 1,
    title: "Sürücülük vəsiqəsinin dəyişdirilməsi",
    status: "active",
    lastMessage: "Sənədləri hara təqdim etməliyəm?",
    timestamp: "10:30",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Salam. Sürücülük vəsiqəmin vaxtı bitib. Dəyişdirmək üçün nə etməliyəm?",
        time: "10:25",
        status: "read"
      },
      {
        id: 2,
        sender: "support",
        text: "Salam. ASAN xidmət mərkəzlərinə yaxınlaşaraq vəsiqənizi yeniləyə bilərsiniz. Şəxsiyyət vəsiqəniz və köhnə sürücülük vəsiqəniz lazımdır.",
        time: "10:28",
        status: "read"
      },
      {
        id: 3,
        sender: "user",
        text: "Sənədləri hara təqdim etməliyəm?",
        time: "10:30",
        status: "sent"
      }
    ]
  },
  {
    id: 2,
    title: "İmtahan nəticəsi barədə",
    status: "closed",
    lastMessage: "Təşəkkürlər, aydındır.",
    timestamp: "Dünən",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "user",
        text: "İmtahan nəticəmi hardan görə bilərəm?",
        time: "09:15",
        status: "read"
      },
      {
        id: 2,
        sender: "support",
        text: "Şəxsi kabinetinizdə 'Nəticələrim' bölməsinə daxil olaraq baxa bilərsiniz.",
        time: "09:20",
        status: "read"
      },
      {
        id: 3,
        sender: "user",
        text: "Təşəkkürlər, aydındır.",
        time: "09:22",
        status: "read"
      }
    ]
  },
  {
    id: 3,
    title: "Cərimə ödənişi xətası",
    status: "active",
    lastMessage: "Bu screenshot-a baxa bilərsiniz?",
    timestamp: "Dünən",
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Cəriməni ödəyərkən xəta baş verdi. Pulum çıxıldı amma cərimə silinmədi.",
        time: "14:30",
        status: "read"
      },
      {
        id: 2,
        sender: "support",
        text: "Zəhmət olmasa ödəniş qəbzini göndərin.",
        time: "14:35",
        status: "read"
      },
      {
        id: 3,
        sender: "user",
        text: "Bu screenshot-a baxa bilərsiniz?",
        time: "14:40",
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200",
        status: "delivered"
      }
    ]
  }
];

export default function QAPage({ onBack }) {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // New Ticket Modal State
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketMessage, setNewTicketMessage] = useState("");

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const selectedQuestion = questions.find(q => q.id === selectedQuestionId);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (selectedQuestionId && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedQuestionId, questions]);

  const handleCreateTicket = () => {
    if (!newTicketSubject || !newTicketMessage.trim()) return;

    const newTicket = {
      id: Date.now(),
      title: newTicketSubject,
      status: "active",
      lastMessage: newTicketMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unreadCount: 0,
      messages: [
        {
          id: Date.now(),
          sender: "user",
          text: newTicketMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: "sent"
        }
      ]
    };

    setQuestions([newTicket, ...questions]);
    setSelectedQuestionId(newTicket.id);
    setIsNewTicketOpen(false);
    setNewTicketSubject("");
    setNewTicketMessage("");
  };

  const handleSendMessage = () => {
    if ((!newMessage.trim()) || !selectedQuestionId) return;

    const updatedQuestions = questions.map(q => {
      if (q.id === selectedQuestionId) {
        return {
          ...q,
          lastMessage: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          messages: [
            ...q.messages,
            {
              id: Date.now(),
              sender: "user",
              text: newMessage,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: "sent"
            }
          ]
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    setNewMessage("");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check size (3MB limit)
    if (file.size > 3 * 1024 * 1024) {
      alert("Şəkil həcmi 3MB-dan çox olmamalıdır.");
      event.target.value = null; // Reset input
      return;
    }

    // In a real app, upload to server here.
    // For this demo, we'll create a fake local URL.
    const fakeUrl = URL.createObjectURL(file);

    const updatedQuestions = questions.map(q => {
      if (q.id === selectedQuestionId) {
        return {
          ...q,
          lastMessage: "Şəkil göndərildi",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          messages: [
            ...q.messages,
            {
              id: Date.now(),
              sender: "user",
              text: "",
              type: "image",
              imageUrl: fakeUrl,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: "sent"
            }
          ]
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    event.target.value = null;
  };

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">

      {/* Left Sidebar - Question List */}
      <div className={`
        absolute inset-y-0 left-0 w-full lg:static lg:w-[380px] bg-white border-r border-gray-200 flex flex-col z-20 transition-transform duration-300
        ${selectedQuestionId !== null ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>

        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <button
                onClick={onBack}
                className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Sual - Cavab</h1>
          </div>
          <button
            onClick={() => setIsNewTicketOpen(true)}
            className="p-2 bg-primary-50 text-primary-600 rounded-xl hover:bg-primary-100 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 text-sm text-gray-900 pl-10 pr-4 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-primary-500/20 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredQuestions.map(q => (
            <div
              key={q.id}
              onClick={() => setSelectedQuestionId(q.id)}
              className={`
                px-4 py-3 cursor-pointer transition-all border-b border-gray-50 hover:bg-gray-50 group
                ${selectedQuestionId === q.id ? 'bg-primary-50/50 hover:bg-primary-50' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-semibold text-sm truncate pr-2 ${selectedQuestionId === q.id ? 'text-primary-700' : 'text-gray-900'}`}>
                  {q.title}
                </h3>
                <span className={`text-[11px] whitespace-nowrap ${q.unreadCount > 0 ? 'text-primary-600 font-bold' : 'text-gray-400'}`}>
                  {q.timestamp}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 truncate max-w-[85%] leading-relaxed">
                  {q.lastMessage.startsWith("Şəkil") ? <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3"/> Şəkil</span> : q.lastMessage}
                </p>
                {q.unreadCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full shadow-sm shadow-primary-500/30">
                    {q.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className={`
        flex-1 flex flex-col bg-[#f0f2f5] relative z-10 transition-transform duration-300 w-full
        ${selectedQuestionId !== null ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:opacity-100 opacity-0'}
      `}>
        {/* Chat Background Pattern Overlay */}
         <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='1.5'%3E%3Ctext x='60' y='65' font-family='sans-serif' font-weight='bold' font-size='22' text-anchor='middle' fill='%23000000' stroke='none'%3EDDA%3C/text%3E%3Cpath d='M15 15 L25 15 L30 20 L30 30 L25 35 L15 35 L10 30 L10 20 Z' /%3E%3Cpath d='M95 15 L110 40 L80 40 Z' /%3E%3Ccircle cx='25' cy='95' r='14' /%3E%3Crect x='85' y='85' width='26' height='26' rx='4' /%3E%3C/g%3E%3C/svg%3E")`
         }}></div>

        {selectedQuestion ? (
          <>
            {/* Chat Header */}
            <div className="bg-[#f0f2f5] px-4 py-3 flex items-center justify-between border-b border-gray-200 shadow-sm relative z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedQuestionId(null)}
                  className="lg:hidden p-1.5 -ml-2 text-gray-600 hover:bg-gray-200 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
                  {selectedQuestion.title.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 text-sm">{selectedQuestion.title}</h2>
                  <p className="text-xs text-primary-600 font-medium">
                     Ticket #{selectedQuestion.id} • {selectedQuestion.status === 'active' ? 'Aktiv' : 'Bağlı'}
                  </p>
                </div>
              </div>
              <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative z-10">
              {selectedQuestion.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 shadow-sm relative text-[14px] leading-snug
                      ${msg.sender === 'user'
                        ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none'
                        : 'bg-white text-gray-900 rounded-tl-none'
                      }
                    `}
                  >
                    {msg.type === 'image' ? (
                       <div className="mb-1">
                          <img src={msg.imageUrl} alt="Attachment" className="rounded-lg max-h-60 object-cover border border-black/5" />
                       </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}

                    <div className={`flex items-center gap-1 justify-end mt-1 ${msg.sender === 'user' ? 'opacity-70' : 'opacity-40'}`}>
                      <span className="text-[10px] font-medium">
                        {msg.time}
                      </span>
                      {msg.sender === 'user' && (
                        msg.status === 'read' ? <CheckCheck className="w-3.5 h-3.5 text-blue-500" /> : <Check className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-[#f0f2f5] px-4 py-3 relative z-10">
              <div className="flex items-end gap-2 bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
                <input
                   type="file"
                   accept="image/*"
                   className="hidden"
                   ref={fileInputRef}
                   onChange={handleFileUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors mb-0.5"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Bir mesaj yazın..."
                  className="flex-1 max-h-32 min-h-[44px] py-2.5 px-2 bg-transparent border-none focus:ring-0 text-sm resize-none custom-scrollbar placeholder:text-gray-400"
                  rows={1}
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-2 rounded-full mb-0.5 transition-all duration-300 ${
                    newMessage.trim()
                      ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700 hover:scale-105'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-2">
                 Maksimum fayl həcmi: 3MB. Səsli mesaj və zəng dəstəklənmir.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 relative z-10 p-8 text-center">
            <div className="w-24 h-24 bg-gray-100/50 rounded-full flex items-center justify-center mb-4">
               <div className="bg-[#d9fdd3] p-4 rounded-2xl shadow-sm rotate-[-6deg]">
                  <div className="bg-white p-4 rounded-2xl shadow-sm rotate-[12deg] -ml-2 -mt-2">
                      <Search className="w-8 h-8 text-gray-300" />
                  </div>
               </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Sual - Cavab</h3>
            <p className="max-w-md text-sm text-gray-500">
              Sual vermək və ya mövcud suallarınızı izləmək üçün sol tərəfdən seçim edin.
            </p>
          </div>
        )}
      </div>

      {/* New Ticket Modal */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Yeni müraciət</h3>
              <button
                onClick={() => setIsNewTicketOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mövzu</label>
                <select
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm text-gray-900"
                >
                  <option value="">Seçin...</option>
                  <option value="Texniki dəstək">Texniki dəstək</option>
                  <option value="Ödənişlər">Ödənişlər</option>
                  <option value="İmtahan sualları">İmtahan sualları</option>
                  <option value="Təklif və iradlar">Təklif və iradlar</option>
                  <option value="Digər">Digər</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mesajınız</label>
                <textarea
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  placeholder="Sualınızı bura yazın..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm resize-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCreateTicket}
                  disabled={!newTicketSubject || !newTicketMessage.trim()}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all transform active:scale-[0.98] ${
                    !newTicketSubject || !newTicketMessage.trim()
                      ? 'bg-gray-200 cursor-not-allowed text-gray-400'
                      : 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30'
                  }`}
                >
                  Göndər
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

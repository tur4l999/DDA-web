import React from 'react';
import { BookOpen, Monitor, Octagon, ArrowRight, PlayCircle, Trophy, Target } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import OnlineClassCard from './OnlineClassCard';

function ActionCard({ icon: Icon, title, desc, onClick, color, bg }) {
  return (
    <Card hover onClick={onClick} className="p-6 flex flex-col items-start gap-4 h-full border-none shadow-sm hover:shadow-md transition-shadow">
      <div className={`p-3.5 rounded-2xl ${bg} ${color}`}>
        <Icon className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-500 font-medium">{desc}</p>
      </div>
      <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-slate-400 group-hover:text-primary-600 transition-colors">
        Keçid et <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </Card>
  )
}

export default function Dashboard({ setCurrentPage }) {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Salam, Tural! 👋</h2>
          <p className="text-slate-500 mt-2 font-medium">Gəlin, harda qaldığınızdan davam edək.</p>
        </div>
      </section>

      {/* Continue Learning Card */}
      <section>
        <Card className="p-0 overflow-hidden flex flex-col md:flex-row border-slate-200 shadow-sm">
          <div className="p-6 md:p-8 flex flex-col justify-center flex-1 bg-gradient-to-br from-white to-slate-50">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-600 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
              Sonuncu dərs
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Yol Hərəkəti Qaydaları: Dərs 4</h3>
            <p className="text-slate-600 mb-8 text-sm md:text-base leading-relaxed max-w-lg">
              Yol nişanlarının qruplaşdırılması və onların tətbiq sahələri haqqında ətraflı izahat.
            </p>
            
            <div className="flex items-center gap-4 mb-8">
               <div className="flex-1 max-w-xs h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-primary-500 h-full rounded-full w-[65%]"></div>
               </div>
               <span className="text-sm font-bold text-slate-700">65%</span>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setCurrentPage('topics')} className="shadow-lg shadow-primary-500/20">
                Davam et
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          
          {/* Decorative Right Side (Desktop) */}
          <div className="hidden md:flex w-1/3 bg-slate-100 items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-500/10"></div>
             <PlayCircle className="w-20 h-20 text-primary-500/20 relative z-10" />
          </div>
        </Card>
      </section>

      {/* Primary Actions Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard 
          icon={BookOpen} 
          title="Təlim Mövzuları" 
          desc="Bütün dərslər və video materiallar" 
          onClick={() => setCurrentPage('topics')}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <ActionCard 
          icon={Monitor} 
          title="İmtahan Simulyatoru" 
          desc="Real imtahan mühitində yoxlayın" 
          onClick={() => setCurrentPage('exam')}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <ActionCard 
          icon={Octagon} 
          title="Yol Nişanları" 
          desc="Nişanlar və onların mənaları" 
          onClick={() => setCurrentPage('road-signs')}
          color="text-orange-600"
          bg="bg-orange-50"
        />
      </section>

      {/* Secondary Information Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Online Classes */}
        <div>
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-lg">Onlayn Dərslər</h3>
              <Button variant="ghost" size="sm" onClick={() => setCurrentPage('classes')}>Hamısına bax</Button>
           </div>
           <OnlineClassCard showViewAll={false} setCurrentPage={setCurrentPage} />
        </div>

        {/* Quick Stats / Daily Goal */}
        <div className="flex flex-col gap-6">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-lg">Gündəlik Hədəf</h3>
           </div>
           
           <Card className="p-6 flex-1 border-none shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                    <Target className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Gündəlik Plan</h4>
                    <p className="text-sm text-slate-500">20 sual cavablandırın</p>
                 </div>
                 <div className="ml-auto text-2xl font-bold text-slate-900">3/20</div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 mb-2">
                  <div className="bg-yellow-500 h-3 rounded-full w-[15%] shadow-sm"></div>
              </div>
              <p className="text-xs text-slate-400 text-center font-medium">Bu gün daha 17 sual cavablandırmalısınız</p>
           </Card>

           <Card className="p-6 flex-1 border-none shadow-sm bg-gradient-to-br from-primary-600 to-primary-800 text-white">
              <div className="flex items-start justify-between">
                 <div>
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                       <Trophy className="w-5 h-5" />
                       <span className="font-bold text-sm uppercase tracking-wide">Ümumi Nəticə</span>
                    </div>
                    <div className="text-4xl font-bold mb-1">85%</div>
                    <p className="text-primary-100 text-sm">Keçən həftəyə nəzərən +5%</p>
                 </div>
                 <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center font-bold text-xl backdrop-blur-sm">
                    A
                 </div>
              </div>
           </Card>
        </div>
      </section>
    </div>
  )
}

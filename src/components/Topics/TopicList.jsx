import React, { useState } from 'react';
import { Search, CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export default function TopicList({ topics, onSelectTopic }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'completed') return matchesSearch && topic.completed;
    if (filter === 'in_progress') return matchesSearch && topic.progress > 0 && !topic.completed;
    if (filter === 'new') return matchesSearch && topic.progress === 0;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Təlim Mövzuları</h2>
           <p className="text-slate-500">Bütün dərslər və materiallar</p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
                type="text" 
                placeholder="Axtar..."
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
             {['all', 'in_progress', 'completed'].map(f => (
                <button
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                   }`}
                >
                   {f === 'all' && 'Hamısı'}
                   {f === 'in_progress' && 'Davam edir'}
                   {f === 'completed' && 'Tamamlanmış'}
                </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {filteredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} onClick={() => onSelectTopic(topic)} />
         ))}
      </div>
    </div>
  );
}

function TopicCard({ topic, onClick }) {
   return (
      <Card hover onClick={onClick} className="flex flex-col h-full border-slate-200">
         <div className="p-5 flex-1">
            <div className="flex justify-between items-start mb-3">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{topic.code}</span>
               {topic.completed ? (
                  <Badge variant="success">Tamamlanıb</Badge>
               ) : topic.progress > 0 ? (
                  <Badge variant="warning">{topic.progress}%</Badge>
               ) : (
                  <Badge variant="neutral">Başlanmayıb</Badge>
               )}
            </div>
            
            <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">{topic.title}</h3>
            
            {topic.subTopics && (
               <p className="text-xs text-slate-500 mb-4">{topic.subTopics.length} Alt mövzu</p>
            )}
         </div>
         
         <div className="p-5 pt-0 mt-auto">
            {topic.progress > 0 ? (
               <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3">
                  <div className="bg-primary-500 h-1.5 rounded-full transition-all" style={{ width: `${topic.progress}%` }}></div>
               </div>
            ) : <div className="h-1.5 mb-3"></div>}
            
            <button className="w-full py-2 flex items-center justify-center gap-2 text-primary-600 font-medium bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors text-sm">
               {topic.progress > 0 ? 'Davam et' : 'Başla'}
               <PlayCircle className="w-4 h-4" />
            </button>
         </div>
      </Card>
   )
}

import { ArrowUpRight, ArrowDownLeft, Calendar, CreditCard, Search, Download, Filter, CheckCircle, XCircle, Clock, ChevronRight, Wallet } from 'lucide-react'
import { useState } from 'react'

const mockTransactions = [
  {
    id: 'TRX-982341',
    service: 'Balans Artırma',
    category: 'Balans',
    date: '03 Dek 2023, 14:30',
    amount: '5.00',
    status: 'success',
    method: 'Visa •••• 4242'
  },
  {
    id: 'TRX-982342',
    service: 'Balans Artırma',
    category: 'Balans',
    date: '01 Dek 2023, 09:15',
    amount: '120.00',
    status: 'success',
    method: 'Mastercard •••• 8899'
  },
  {
    id: 'TRX-982343',
    service: 'Balans Artırma',
    category: 'Balans',
    date: '28 Noy 2023, 16:45',
    amount: '45.00',
    status: 'failed',
    method: 'Visa •••• 4242'
  },
  {
    id: 'TRX-982344',
    service: 'Balans Artırma',
    category: 'Balans',
    date: '25 Noy 2023, 11:20',
    amount: '12.50',
    status: 'pending',
    method: 'Apple Pay'
  },
  {
    id: 'TRX-982345',
    service: 'Balans Artırma',
    category: 'Balans',
    date: '20 Noy 2023, 10:00',
    amount: '25.00',
    status: 'success',
    method: 'Visa •••• 4242'
  }
]

export default function PaymentsPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-100">
            <CheckCircle className="w-3.5 h-3.5" />
            Ödənilib
          </span>
        )
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-700 border border-red-100">
            <XCircle className="w-3.5 h-3.5" />
            Ləğv edilib
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
            <Clock className="w-3.5 h-3.5" />
            Gözləmədə
          </span>
        )
      default:
        return null
    }
  }

  const filteredTransactions = mockTransactions.filter(trx => {
    // Filter by tab
    if (activeTab === 'income' && trx.status !== 'success') return false
    if (activeTab === 'expense' && trx.status !== 'failed') return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        trx.service.toLowerCase().includes(query) ||
        trx.id.toLowerCase().includes(query) ||
        trx.amount.includes(query)
      )
    }

    return true
  })

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-1">
             <button
              onClick={onBack}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-white transition-all lg:hidden"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Ödənişlər</h1>
          </div>
          <p className="text-gray-500 text-sm">Ödəniş tarixçəsi və status məlumatları</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Removed Total Spent Card */}

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Calendar className="w-24 h-24 text-amber-500" />
              </div>
              <div className="relative">
                <p className="text-sm font-medium text-gray-500 mb-2">Son ödəniş</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-gray-900 tracking-tight">5.00 ₼</h3>
                  <span className="text-xs text-gray-400">03.12.2023</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Balans Artırma</p>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Hamısı
                </button>
                <button
                  onClick={() => setActiveTab('income')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'income' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Uğurlu
                </button>
                <button
                  onClick={() => setActiveTab('expense')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'expense' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Ləğv edilənlər
                </button>
              </div>

              <div className="flex items-center gap-2">
                 <div className="relative hidden sm:block">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Axtar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 w-48 transition-all"
                  />
                </div>
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Xidmət</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarix</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qəbz ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Məbləğ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((trx) => (
                      <tr key={trx.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform duration-300">
                               <Wallet className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{trx.service}</p>
                              <p className="text-xs text-gray-500">{trx.method}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900 font-medium">{trx.date.split(',')[0]}</p>
                          <p className="text-xs text-gray-500">{trx.date.split(',')[1]}</p>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(trx.status)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                            {trx.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`text-sm font-bold tracking-tight ${trx.status === 'failed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {trx.amount} ₼
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-sm">
                        Heç bir nəticə tapılmadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination */}
             <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {filteredTransactions.length > 0 ? `1-${filteredTransactions.length} arası göstərilir` : '0 nəticə'} (Cəmi {mockTransactions.length})
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-900 disabled:opacity-50 transition-colors">
                    <ArrowDownLeft className="w-4 h-4 rotate-90" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-900 disabled:opacity-50 transition-colors">
                    <ArrowUpRight className="w-4 h-4 rotate-90" />
                  </button>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  )
}

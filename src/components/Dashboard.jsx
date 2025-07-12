import { BookOpen, Clock, CheckCircle, Plus } from 'lucide-react'

const Dashboard = ({ books }) => {
  const stats = {
    total: books.length,
    toRead: books.filter(book => book.status === 'To Read').length,
    reading: books.filter(book => book.status === 'Reading').length,
    completed: books.filter(book => book.status === 'Completed').length
  }

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Reading Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={BookOpen} 
          label="Total Books" 
          value={stats.total}
          color="bg-blue-500"
        />
        <StatCard 
          icon={Plus} 
          label="To Read" 
          value={stats.toRead}
          color="bg-orange-500"
        />
        <StatCard 
          icon={Clock} 
          label="Currently Reading" 
          value={stats.reading}
          color="bg-yellow-500"
        />
        <StatCard 
          icon={CheckCircle} 
          label="Completed" 
          value={stats.completed}
          color="bg-green-500"
        />
      </div>
    </div>
  )
}

export default Dashboard
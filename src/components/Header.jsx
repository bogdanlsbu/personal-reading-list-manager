import { BookOpen } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Personal Reading List Manager
            </h1>
            <p className="text-gray-600 text-sm">
              Track your reading progress and discover new books
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
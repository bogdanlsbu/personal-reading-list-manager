import { useState } from 'react'
import { Search, Filter } from 'lucide-react'

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value, statusFilter)
  }

  const handleStatusChange = (e) => {
    const value = e.target.value
    setStatusFilter(value)
    onSearch(searchTerm, value)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('All')
    onSearch('', 'All')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Search className="h-5 w-5" />
        Search & Filter
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search by title or author
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type to search..."
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="sm:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by status
          </label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="All">All Books</option>
              <option value="To Read">To Read</option>
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || statusFilter !== 'All') && (
          <div className="sm:w-32 flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilter
import { useState } from 'react'
import { Edit2, Trash2, Save, X, Calendar, StickyNote, ArrowUpDown } from 'lucide-react'

const BookList = ({ books, onUpdateBook, onDeleteBook }) => {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [sortBy, setSortBy] = useState('date_added')
  const [sortOrder, setSortOrder] = useState('desc')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // Sort books based on current sort settings
  const sortedBooks = [...books].sort((a, b) => {
    let aValue, bValue

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      case 'author':
        aValue = a.author.toLowerCase()
        bValue = b.author.toLowerCase()
        break
      case 'date_added':
        aValue = new Date(a.date_added)
        bValue = new Date(b.date_added)
        break
      default:
        return 0
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const startEdit = (book) => {
    setEditingId(book.id)
    setEditForm({
      title: book.title,
      author: book.author,
      status: book.status,
      notes: book.notes || ''
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveEdit = async () => {
    await onUpdateBook(editingId, editForm)
    setEditingId(null)
    setEditForm({})
  }

  const handleDelete = async (id) => {
    await onDeleteBook(id)
    setDeleteConfirm(null)
  }

  const getStatusBadge = (status) => {
    const styles = {
      'To Read': 'bg-orange-100 text-orange-800 border-orange-200',
      'Reading': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Completed': 'bg-green-100 text-green-800 border-green-200'
    }
    return `px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  if (books.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 border text-center">
        <div className="text-gray-400 text-lg mb-2">📚</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
        <p className="text-gray-600">Add your first book or adjust your search filters.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header with sort controls */}
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Books ({books.length})
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleSort('title')}
              className={`px-3 py-1 text-sm rounded-md flex items-center gap-1 transition-colors ${
                sortBy === 'title' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Title <ArrowUpDown className="h-3 w-3" />
            </button>
            <button
              onClick={() => handleSort('author')}
              className={`px-3 py-1 text-sm rounded-md flex items-center gap-1 transition-colors ${
                sortBy === 'author' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Author <ArrowUpDown className="h-3 w-3" />
            </button>
            <button
              onClick={() => handleSort('date_added')}
              className={`px-3 py-1 text-sm rounded-md flex items-center gap-1 transition-colors ${
                sortBy === 'date_added' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Date <ArrowUpDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Books list */}
      <div className="divide-y">
        {sortedBooks.map((book) => (
          <div key={book.id} className="p-6 hover:bg-gray-50 transition-colors">
            {editingId === book.id ? (
              /* Edit Mode */
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={editForm.author}
                      onChange={(e) => setEditForm({...editForm, author: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="To Read">To Read</option>
                      <option value="Reading">Reading</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={editForm.notes}
                    onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {book.title}
                      </h3>
                      <span className={getStatusBadge(book.status)}>
                        {book.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">by {book.author}</p>
                    
                    {book.notes && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                          <StickyNote className="h-3 w-3" />
                          Notes:
                        </div>
                        <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded italic">
                          "{book.notes}"
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      Added {formatDate(book.date_added)}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(book)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit book"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(book.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete book"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm === book.id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Delete Book
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete "{book.title}"? This action cannot be undone.
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookList
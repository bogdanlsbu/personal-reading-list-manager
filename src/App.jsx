import { useState, useEffect } from 'react'
import { supabase } from './services/supabase'
import Header from './components/Header'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import SearchFilter from './components/SearchFilter'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('date_added', { ascending: false })

      if (error) throw error
      setBooks(data || [])
      setFilteredBooks(data || [])
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const addBook = async (bookData) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .insert([bookData])
        .select()

      if (error) throw error
      const newBooks = [data[0], ...books]
      setBooks(newBooks)
      setFilteredBooks(newBooks)
      return { success: true }
    } catch (error) {
      console.error('Error adding book:', error)
      return { success: false, error: error.message }
    }
  }

  const updateBook = async (id, updates) => {
    try {
      const { error } = await supabase
        .from('books')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      
      const updatedBooks = books.map(book => 
        book.id === id ? { ...book, ...updates } : book
      )
      setBooks(updatedBooks)
      setFilteredBooks(updatedBooks)
      return { success: true }
    } catch (error) {
      console.error('Error updating book:', error)
      return { success: false, error: error.message }
    }
  }

  const deleteBook = async (id) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      const remainingBooks = books.filter(book => book.id !== id)
      setBooks(remainingBooks)
      setFilteredBooks(remainingBooks)
      return { success: true }
    } catch (error) {
      console.error('Error deleting book:', error)
      return { success: false, error: error.message }
    }
  }

  const handleSearch = (searchTerm, statusFilter) => {
    let filtered = books

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter && statusFilter !== 'All') {
      filtered = filtered.filter(book => book.status === statusFilter)
    }

    setFilteredBooks(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading your reading list...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Dashboard books={books} />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <BookForm onAddBook={addBook} />
          </div>
          <div className="lg:col-span-2">
            <SearchFilter onSearch={handleSearch} />
            <BookList 
              books={filteredBooks}
              onUpdateBook={updateBook}
              onDeleteBook={deleteBook}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
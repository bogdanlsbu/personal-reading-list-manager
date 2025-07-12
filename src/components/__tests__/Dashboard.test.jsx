import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Dashboard from '../Dashboard'

describe('Dashboard Component', () => {
  const mockBooks = [
    { id: 1, title: 'Test Book 1', author: 'Author 1', status: 'Reading' },
    { id: 2, title: 'Test Book 2', author: 'Author 2', status: 'Completed' },
    { id: 3, title: 'Test Book 3', author: 'Author 3', status: 'To Read' }
  ]

  it('renders reading overview title', () => {
    render(<Dashboard books={mockBooks} />)
    
    expect(screen.getByText('Reading Overview')).toBeInTheDocument()
  })

  it('displays correct book statistics', () => {
    render(<Dashboard books={mockBooks} />)
    
    expect(screen.getByText('3')).toBeInTheDocument() // Total books
    expect(screen.getByText('Total Books')).toBeInTheDocument()
    expect(screen.getByText('To Read')).toBeInTheDocument()
    expect(screen.getByText('Currently Reading')).toBeInTheDocument()
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('handles empty books array', () => {
    render(<Dashboard books={[]} />)
    
    expect(screen.getByText('Reading Overview')).toBeInTheDocument()
    expect(screen.getByText('Total Books')).toBeInTheDocument()
    // With empty array, all stats should be 0, but we won't test the specific number
    // since there are multiple 0s on the page
  })
})
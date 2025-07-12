import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header Component', () => {
  it('renders the app title', () => {
    render(<Header />)
    
    expect(screen.getByText('Personal Reading List Manager')).toBeInTheDocument()
  })

  it('renders the app description', () => {
    render(<Header />)
    
    expect(screen.getByText('Track your reading progress and discover new books')).toBeInTheDocument()
  })
})
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '@/components/Header'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Header />)
 
    expect(screen.getByText(/star wars/i)).toBeInTheDocument()
  })
})
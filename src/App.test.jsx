import { render, screen } from '@testing-library/react';
import App from './App';

describe('Brikoulchi App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText(/Brikoulchi/i)).toBeInTheDocument();
  });

  it('renders the overview section', () => {
    render(<App />);
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });

  it('renders the key features section', () => {
    render(<App />);
    expect(screen.getByText(/Key Features/i)).toBeInTheDocument();
  });

  it('shows "Easy service search and filtering"', () => {
    render(<App />);
    expect(screen.getByText(/Easy service search and filtering/i)).toBeInTheDocument();
  });

  it('shows "Location-based service discovery"', () => {
    render(<App />);
    expect(screen.getByText(/Location-based service discovery/i)).toBeInTheDocument();
  });

  it('shows "Rating and review system"', () => {
    render(<App />);
    expect(screen.getByText(/Rating and review system/i)).toBeInTheDocument();
  });

  it('shows "Responsive design for all devices"', () => {
    render(<App />);
    expect(screen.getByText(/Responsive design for all devices/i)).toBeInTheDocument();
  });

  it('shows "Interactive map interface"', () => {
    render(<App />);
    expect(screen.getByText(/Interactive map interface/i)).toBeInTheDocument();
  });

  it('shows "User profiles and service management"', () => {
    render(<App />);
    expect(screen.getByText(/User profiles and service management/i)).toBeInTheDocument();
  });

  it('shows "Admin dashboard"', () => {
    render(<App />);
    expect(screen.getByText(/Admin dashboard/i)).toBeInTheDocument();
  });

  it('renders the Getting Started section', () => {
    render(<App />);
    expect(screen.getByText(/Getting Started/i)).toBeInTheDocument();
  });

  it('renders the Technical Stack section', () => {
    render(<App />);
    expect(screen.getByText(/Technical Stack/i)).toBeInTheDocument();
  });
});


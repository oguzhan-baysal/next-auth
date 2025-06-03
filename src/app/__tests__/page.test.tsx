import { render, screen } from '@testing-library/react';
import { useUser } from '@auth0/nextjs-auth0';
import HomePage from '../page';

// Mock Auth0 useUser hook
jest.mock('@auth0/nextjs-auth0');
const mockUseUser = useUser as jest.MockedFunction<typeof useUser>;

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Unauthenticated User', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        user: undefined,
        error: undefined,
        isLoading: false,
        checkSession: jest.fn(),
      });
    });

    it('should render welcome message for unauthenticated user', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Next.js Auth0 Integration')).toBeInTheDocument();
      expect(screen.getByText(/Secure authentication with Auth0/)).toBeInTheDocument();
    });

    it('should show login button for unauthenticated user', () => {
      render(<HomePage />);
      
      const loginButton = screen.getByRole('link', { name: /giriş yap/i });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveAttribute('href', '/api/auth/login');
    });

    it('should not show dashboard or admin links', () => {
      render(<HomePage />);
      
      expect(screen.queryByText(/dashboard/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/admin panel/i)).not.toBeInTheDocument();
    });

    it('should show features section', () => {
      render(<HomePage />);
      
      expect(screen.getByText('🔐 Secure Authentication')).toBeInTheDocument();
      expect(screen.getByText('👥 Role-Based Access')).toBeInTheDocument();
      expect(screen.getByText('📊 Admin Dashboard')).toBeInTheDocument();
      expect(screen.getByText('🚀 Modern Tech Stack')).toBeInTheDocument();
    });
  });

  describe('Authenticated Regular User', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        user: {
          sub: 'auth0|123456',
          email: 'user@example.com',
          name: 'Test User',
          picture: 'https://example.com/avatar.jpg',
        },
        error: undefined,
        isLoading: false,
        checkSession: jest.fn(),
      });
    });

    it('should show personalized welcome message', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Hoş geldin, Test User!')).toBeInTheDocument();
    });

    it('should show dashboard link for authenticated user', () => {
      render(<HomePage />);
      
      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toBeInTheDocument();
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    });

    it('should show logout button', () => {
      render(<HomePage />);
      
      const logoutButton = screen.getByRole('link', { name: /çıkış yap/i });
      expect(logoutButton).toBeInTheDocument();
      expect(logoutButton).toHaveAttribute('href', '/api/auth/logout');
    });

    it('should not show admin panel link for regular user', () => {
      render(<HomePage />);
      
      expect(screen.queryByText(/admin panel/i)).not.toBeInTheDocument();
    });
  });

  describe('Authenticated Admin User', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        user: {
          sub: 'auth0|admin123',
          email: 'admin@example.com',
          name: 'Admin User',
          picture: 'https://example.com/admin-avatar.jpg',
        },
        error: undefined,
        isLoading: false,
        checkSession: jest.fn(),
      });
    });

    it('should show admin panel link for admin user', () => {
      render(<HomePage />);
      
      const adminLink = screen.getByRole('link', { name: /admin panel/i });
      expect(adminLink).toBeInTheDocument();
      expect(adminLink).toHaveAttribute('href', '/admin');
    });

    it('should show both dashboard and admin links', () => {
      render(<HomePage />);
      
      expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /admin panel/i })).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        user: undefined,
        error: undefined,
        isLoading: true,
        checkSession: jest.fn(),
      });
    });

    it('should show loading state', () => {
      render(<HomePage />);
      
      expect(screen.getByText('Yükleniyor...')).toBeInTheDocument();
    });

    it('should not show other content while loading', () => {
      render(<HomePage />);
      
      expect(screen.queryByText('Next.js Auth0 Integration')).not.toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        user: undefined,
        error: new Error('Authentication failed'),
        isLoading: false,
        checkSession: jest.fn(),
      });
    });

    it('should show error message', () => {
      render(<HomePage />);
      
      expect(screen.getByText(/kimlik doğrulama hatası/i)).toBeInTheDocument();
      expect(screen.getByText('Authentication failed')).toBeInTheDocument();
    });

    it('should show retry button', () => {
      render(<HomePage />);
      
      const retryButton = screen.getByRole('link', { name: /tekrar dene/i });
      expect(retryButton).toBeInTheDocument();
      expect(retryButton).toHaveAttribute('href', '/api/auth/login');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        user: undefined,
        error: undefined,
        isLoading: false,
        checkSession: jest.fn(),
      });
    });

    it('should have proper heading hierarchy', () => {
      render(<HomePage />);
      
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent('Next.js Auth0 Integration');
      
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it('should have descriptive button text', () => {
      render(<HomePage />);
      
      const loginButton = screen.getByRole('link', { name: /giriş yap/i });
      expect(loginButton).toHaveAccessibleName();
    });

    it('should have proper semantic structure', () => {
      render(<HomePage />);
      
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({
        user: undefined,
        error: undefined,
        isLoading: false,
        checkSession: jest.fn(),
      });
    });

    it('should apply proper CSS classes', () => {
      render(<HomePage />);
      
      const main = screen.getByRole('main');
      expect(main).toHaveClass('min-h-screen', 'bg-gradient-to-br');
    });

    it('should have responsive design classes', () => {
      render(<HomePage />);
      
      const container = screen.getByRole('main').querySelector('.container');
      expect(container).toHaveClass('mx-auto', 'px-4');
    });
  });
}); 
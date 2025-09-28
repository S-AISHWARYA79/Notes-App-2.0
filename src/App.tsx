import { useAuth } from './hooks/useAuth';
import { useNotes } from './hooks/useNotes';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const {
    notes,
    selectedNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote
  } = useNotes(user?.id);

  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      {!isAuthenticated || !user ? (
        <LoginPage onLogin={login} onSignup={signup} />
      ) : (
        <Dashboard
          user={user}
          notes={notes}
          selectedNote={selectedNote}
          onCreateNote={createNote}
          onSelectNote={selectNote}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
          onLogout={logout}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
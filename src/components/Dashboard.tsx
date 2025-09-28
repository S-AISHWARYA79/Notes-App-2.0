import { Plus, LogOut, User, Search } from 'lucide-react';
import { Note } from '../types';
import { NotesList } from './NotesList';
import { NoteEditor } from './NoteEditor';
import { ThemeToggle } from './ThemeToggle';
import { useState } from 'react';

interface DashboardProps {
  user: { id: string; username: string; email: string };
  notes: Note[];
  selectedNote: Note | null;
  onCreateNote: () => void;
  onSelectNote: (note: Note) => void;
  onUpdateNote: (id: string, updates: Partial<Pick<Note, 'title' | 'body'>>) => void;
  onDeleteNote: (id: string) => void;
  onLogout: () => void;
}

export const Dashboard = ({
  user,
  notes,
  selectedNote,
  onCreateNote,
  onSelectNote,
  onUpdateNote,
  onDeleteNote,
  onLogout
}: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4 transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">My Notes</h1>
            <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm font-medium">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <div className="hidden sm:flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">{user.username}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-full sm:w-80 lg:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => onCreateNote()}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>New Note</span>
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto p-4">
            <NotesList
              notes={filteredNotes}
              selectedNote={selectedNote}
              onSelectNote={onSelectNote}
              onDeleteNote={onDeleteNote}
            />
          </div>
        </div>

        {/* Editor */}
        <div className="hidden lg:block flex-1 p-4 lg:p-6">
          <NoteEditor
            selectedNote={selectedNote}
            onUpdateNote={onUpdateNote}
          />
        </div>
      </div>
    </div>
  );
};
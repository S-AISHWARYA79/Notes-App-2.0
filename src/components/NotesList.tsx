import { Note } from '../types';
import { Calendar, Trash2, FileText } from 'lucide-react';

interface NotesListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesList = ({ notes, selectedNote, onSelectNote, onDeleteNote }: NotesListProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDeleteClick = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this note?')) {
      onDeleteNote(noteId);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <FileText className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg font-medium">No notes yet</p>
        <p className="text-sm">Create your first note to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onSelectNote(note)}
          className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 group ${
            selectedNote?.id === note.id
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm'
              : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-white truncate mb-1">
                {note.title || 'Untitled'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                {note.body || 'No content'}
              </p>
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                <span>
                  {note.updatedAt.getTime() !== note.createdAt.getTime()
                    ? `Updated ${formatDate(note.updatedAt)}`
                    : `Created ${formatDate(note.createdAt)}`
                  }
                </span>
              </div>
            </div>
            <button
              onClick={(e) => handleDeleteClick(e, note.id)}
              className="ml-2 p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors opacity-0 group-hover:opacity-100"
              title="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
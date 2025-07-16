'use client';

import { deleteNote } from '@/app/actions/delete-note';
import { useState } from 'react';

import { AddNoteDialog } from '@/app/notes/components/AddNoteDialog';
import NoteCard from '@/app/notes/components/NoteCard';
import NotesStats from '@/app/notes/components/NotesStats';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Note } from '@prisma/client';
import { Inbox } from 'lucide-react';
import { toast } from 'sonner';

interface NotesClientProps {
  notes: Note[];
  userId: string;
}

export default function NotesClient({
  notes: initialNotes,
  userId,
}: NotesClientProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleNoteAdded = (newNote?: Note) => {
    if (newNote) {
      setNotes((currentNotes) => [newNote, ...currentNotes]);
      toast.success('Nota criada com sucesso!', {
        description: `"${newNote.title}" foi adicionada à sua lista.`,
      });
    } else {
      toast.success('Nota criada!', {
        description: 'Recarregando para atualizar a lista...',
      });
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const confirmDelete = (id: string, title: string) => {
    setDeleteTarget({ id, title });
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return;

    try {
      await deleteNote(deleteTarget.id);
      setNotes((prev) => prev.filter((note) => note.id !== deleteTarget.id));

      toast.success('Nota excluída', {
        description: `"${deleteTarget.title}" foi removida com sucesso.`,
      });
    } catch (error) {
      console.error('Erro ao excluir nota:', error);
      toast.error('Erro ao excluir nota', {
        description: 'Tente novamente mais tarde.',
      });
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setShowAddDialog(true);
  };

  const handleNoteUpdated = (updated: Note) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
  };

  return (
    <div className='bg-gray-900 text-gray-200'>
      <div className='max-w-6xl mx-auto px-4 py-6'>
        {/* Grid 2 colunas: lateral esquerda (stats) + conteúdo principal (notas) */}
        <div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6'>
          {/* Painel lateral com estatísticas */}
          <div className='space-y-4'>
            <NotesStats
              notesCount={notes.length}
              completedCount={notes.filter((n) => n.done).length}
              pendingCount={notes.filter((n) => !n.done).length}
              highCount={notes.filter((n) => n.priority === 'HIGH').length}
              onAdd={() => setShowAddDialog(true)}
            />
          </div>

          {/* Lista de notas */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={confirmDelete}
                  onEdit={handleEditNote} // ✅ passa callback
                />
              ))
            ) : (
              <Card className='p-10 text-center bg-gray-900 border border-gray-800 shadow-md'>
                <div className='flex flex-col items-center justify-center space-y-4'>
                  <Inbox className='w-12 h-12 text-gray-600' />
                  <h3 className='text-xl font-semibold text-gray-300'>
                    Nenhuma nota encontrada
                  </h3>
                  <p className='text-gray-500 max-w-sm'>
                    Comece criando sua primeira nota para organizar suas ideias!
                  </p>
                  <Button onClick={() => setShowAddDialog(true)}>
                    Criar Primeira Nota
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Modal para adicionar nota */}
      <AddNoteDialog
        visible={showAddDialog}
        onHide={() => {
          setShowAddDialog(false);
          setSelectedNote(null);
        }}
        onNoteAdded={handleNoteAdded}
        onNoteUpdated={handleNoteUpdated} // ✅ para atualizar no estado
        userId={userId}
        noteToEdit={selectedNote} // ✅ passa a nota selecionada
      />

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent className='bg-gray-900 border border-gray-800 text-gray-200'>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Nota</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a nota{' '}
              <span className='font-semibold text-gray-100'>
                “{deleteTarget?.title}”
              </span>
              ? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirmed}
              className='bg-red-600 hover:bg-red-700'
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

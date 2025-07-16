'use client';

import { deleteNote } from '@/app/actions/delete-note';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import AddNoteDialog from './AddNoteDialog';

interface Note {
  id: string;
  title: string;
  content: string | null;
  done: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: Date;
  dueDate: Date | null;
  userId: string;
}

interface NotesClientProps {
  notes: Note[];
  userId: string;
}

const NotesClient = ({ notes: initialNotes, userId }: NotesClientProps) => {
  const [notes, setNotes] = useState(initialNotes);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const toast = useRef<Toast>(null);

  const handleNoteAdded = (newNote?: Note) => {
    // Se recebemos a nova nota, adicionar ao estado
    if (newNote) {
      setNotes((currentNotes) => [newNote, ...currentNotes]);
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Nota criada com sucesso!',
        life: 3000,
      });
    } else {
      // Fallback caso não receba a nota
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Nota criada com sucesso! Recarregando...',
        life: 2000,
      });
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleDeleteNote = async (noteId: string, noteTitle: string) => {
    confirmDialog({
      message: `Tem certeza que deseja excluir a nota "${noteTitle}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          await deleteNote(noteId);

          // Atualizar o state removendo a nota excluída (otimistic update)
          setNotes((currentNotes) =>
            currentNotes.filter((note) => note.id !== noteId)
          );

          toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Nota excluída com sucesso',
            life: 3000,
          });
        } catch (error) {
          console.error('Erro ao excluir nota:', error);
          toast.current?.show({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir nota. Tente novamente.',
            life: 3000,
          });
        }
      },
      reject: () => {
        toast.current?.show({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Exclusão cancelada',
          life: 2000,
        });
      },
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'danger';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'success';
      default:
        return 'info';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'pi pi-exclamation-triangle';
      case 'MEDIUM':
        return 'pi pi-minus';
      case 'LOW':
        return 'pi pi-arrow-down';
      default:
        return 'pi pi-info-circle';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const renderNoteCard = (note: Note) => {
    const header = (
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <h3 className='text-lg font-semibold text-gray-800'>{note.title}</h3>
          {note.done && <Badge value='Concluída' severity='success' />}
        </div>
        <div className='flex items-center gap-2'>
          <Tag
            value={note.priority}
            severity={getPriorityColor(note.priority)}
            icon={getPriorityIcon(note.priority)}
          />
        </div>
      </div>
    );

    const footer = (
      <div className='flex justify-between items-center'>
        <div className='text-sm text-gray-500'>
          <i className='pi pi-calendar mr-1'></i>
          Criado em {formatDate(note.createdAt)}
        </div>
        <div className='flex gap-2'>
          <Button
            icon='pi pi-pencil'
            severity='info'
            size='small'
            outlined
            tooltip='Editar'
          />
          <Button
            icon={note.done ? 'pi pi-times' : 'pi pi-check'}
            severity={note.done ? 'warning' : 'success'}
            size='small'
            outlined
            tooltip={
              note.done ? 'Marcar como pendente' : 'Marcar como concluída'
            }
          />
          <Button
            icon='pi pi-trash'
            severity='danger'
            size='small'
            outlined
            tooltip='Excluir'
            onClick={() => handleDeleteNote(note.id, note.title)}
          />
        </div>
      </div>
    );

    return (
      <Card
        key={note.id}
        header={header}
        footer={footer}
        className={`mb-4 shadow-lg ${note.done ? 'opacity-75' : ''}`}
      >
        <div className='py-2'>
          {note.content ? (
            <p className='text-gray-700 leading-relaxed'>{note.content}</p>
          ) : (
            <p className='text-gray-400 italic'>Sem conteúdo</p>
          )}

          {note.dueDate && (
            <div className='mt-3 pt-3 border-t border-gray-200'>
              <div className='flex items-center text-sm text-orange-600'>
                <i className='pi pi-clock mr-2'></i>
                Vencimento: {formatDate(note.dueDate)}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <Panel className='mb-6'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-2xl font-bold text-gray-800 mb-2'>
                <i className='pi pi-list mr-3 text-blue-600'></i>
                Suas Notas
              </h1>
              <p className='text-gray-600'>
                Organize suas ideias e tarefas de forma eficiente
              </p>
            </div>
            <Button
              label='Nova Nota'
              icon='pi pi-plus'
              severity='success'
              size='large'
              onClick={() => setShowAddDialog(true)}
            />
          </div>
        </Panel>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <Card className='text-center'>
            <div className='text-2xl font-bold text-blue-600'>
              {notes.length}
            </div>
            <div className='text-sm text-gray-600'>Total de Notas</div>
          </Card>
          <Card className='text-center'>
            <div className='text-2xl font-bold text-green-600'>
              {notes.filter((note) => note.done).length}
            </div>
            <div className='text-sm text-gray-600'>Concluídas</div>
          </Card>
          <Card className='text-center'>
            <div className='text-2xl font-bold text-orange-600'>
              {notes.filter((note) => !note.done).length}
            </div>
            <div className='text-sm text-gray-600'>Pendentes</div>
          </Card>
          <Card className='text-center'>
            <div className='text-2xl font-bold text-red-600'>
              {notes.filter((note) => note.priority === 'HIGH').length}
            </div>
            <div className='text-sm text-gray-600'>Alta Prioridade</div>
          </Card>
        </div>

        <Divider />

        {/* Notes List */}
        <div className='mt-6'>
          {notes.length > 0 ? (
            <div className='space-y-4'>{notes.map(renderNoteCard)}</div>
          ) : (
            <Card className='text-center py-12'>
              <div className='text-gray-400'>
                <i className='pi pi-inbox text-6xl mb-4 block'></i>
                <h3 className='text-xl font-semibold mb-2'>
                  Nenhuma nota encontrada
                </h3>
                <p className='text-gray-500 mb-4'>
                  Comece criando sua primeira nota para organizar suas ideias!
                </p>
                <Button
                  label='Criar Primeira Nota'
                  icon='pi pi-plus'
                  severity='success'
                  onClick={() => setShowAddDialog(true)}
                />
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Toast for notifications */}
      <Toast ref={toast} />

      {/* Toast and Confirm Dialog */}
      <Toast ref={toast} />
      <ConfirmDialog />

      {/* Add Note Dialog */}
      <AddNoteDialog
        visible={showAddDialog}
        onHide={() => setShowAddDialog(false)}
        onNoteAdded={handleNoteAdded}
        userId={userId}
      />
    </div>
  );
};

export default NotesClient;

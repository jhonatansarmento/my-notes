'use client';

import { createNote } from '@/app/actions/create-note';
import { updateNote } from '@/app/actions/update-note';
import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

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

interface AddNoteDialogProps {
  visible: boolean;
  onHide: () => void;
  onNoteAdded?: (note: Note) => void; // usado no modo criar
  onNoteUpdated?: (note: Note) => void; // usado no modo editar
  userId: string;
  noteToEdit?: Note | null; // ✅ NOVO: se tiver nota -> modo edição
}

export function AddNoteDialog({
  visible,
  onHide,
  onNoteAdded,
  onNoteUpdated,
  userId,
  noteToEdit,
}: AddNoteDialogProps) {
  const defaultForm = {
    title: '',
    content: '',
    priority: 'MEDIUM' as Priority,
    dueDate: null as Date | null,
  };

  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditing = !!noteToEdit;

  // ✅ Quando abrir para edição, popula os campos com os valores da nota
  useEffect(() => {
    if (noteToEdit) {
      setFormData({
        title: noteToEdit.title,
        content: noteToEdit.content ?? '',
        priority: noteToEdit.priority,
        dueDate: noteToEdit.dueDate ? new Date(noteToEdit.dueDate) : null,
      });
    } else {
      setFormData(defaultForm);
    }
  }, [noteToEdit, visible]);

  const resetForm = () => {
    setFormData(defaultForm);
    setError('');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!formData.title.trim()) {
      setError('Título é obrigatório');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isEditing && noteToEdit) {
        // ✅ EDITAR NOTA EXISTENTE
        const updated = await updateNote({
          id: noteToEdit.id,
          title: formData.title.trim(),
          content: formData.content.trim() || undefined,
          priority: formData.priority,
          dueDate: formData.dueDate || undefined,
        });

        onNoteUpdated?.(updated); // atualiza estado no NotesClient
      } else {
        // ✅ CRIAR NOVA NOTA
        const newNote = await createNote({
          userId,
          title: formData.title.trim(),
          content: formData.content.trim() || undefined,
          priority: formData.priority,
          dueDate: formData.dueDate || undefined,
        });

        onNoteAdded?.(newNote);
      }

      resetForm();
      onHide();
    } catch (err) {
      console.error('Erro ao salvar nota:', err);
      setError('Erro ao salvar nota. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onHide();
  };

  return (
    <Dialog open={visible} onOpenChange={onHide}>
      <DialogContent className='sm:max-w-lg bg-gray-900 border border-gray-800 text-gray-200'>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Nota' : 'Nova Nota'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Atualize os campos abaixo e salve as alterações.'
              : 'Preencha os campos abaixo para criar uma nova nota.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4 py-2' id='note-form'>
          {error && (
            <div className='text-red-400 text-sm bg-red-500/10 border border-red-500 rounded-md px-3 py-2'>
              {error}
            </div>
          )}

          {/* Título */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='title' className='text-sm font-medium'>
              Título *
            </label>
            <Input
              id='title'
              placeholder='Digite o título da nota...'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={loading}
              autoFocus
            />
          </div>

          {/* Conteúdo */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='content' className='text-sm font-medium'>
              Conteúdo
            </label>
            <Textarea
              id='content'
              placeholder='Digite o conteúdo da nota...'
              rows={4}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              disabled={loading}
            />
          </div>

          {/* Prioridade */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='priority' className='text-sm font-medium'>
              Prioridade
            </label>
            <Select
              value={formData.priority}
              onValueChange={(value: Priority) =>
                setFormData({ ...formData, priority: value })
              }
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecione a prioridade' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='LOW'>Baixa</SelectItem>
                <SelectItem value='MEDIUM'>Média</SelectItem>
                <SelectItem value='HIGH'>Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data de vencimento */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>
              Data de Vencimento (opcional)
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={`justify-start text-left font-normal ${
                    !formData.dueDate && 'text-muted-foreground'
                  }`}
                  disabled={loading}
                  type='button'
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {formData.dueDate
                    ? format(formData.dueDate, 'dd/MM/yyyy')
                    : 'Selecione uma data'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0 bg-gray-900 border border-gray-800'>
                <Calendar
                  mode='single'
                  selected={formData.dueDate || undefined}
                  onSelect={(date) =>
                    setFormData({ ...formData, dueDate: date || null })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>

        <DialogFooter className='flex justify-end gap-2 mt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type='submit' form='note-form' disabled={loading}>
            {isEditing ? 'Salvar Alterações' : 'Criar Nota'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

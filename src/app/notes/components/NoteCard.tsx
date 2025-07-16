'use client';

import { format } from 'date-fns';
import { useCallback } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Note } from '@prisma/client';
import {
  AlertTriangle,
  ArrowDown,
  Calendar as CalendarIcon,
  Check,
  Clock,
  Info,
  Minus,
  Pencil,
  Trash2,
  X,
} from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string, title: string) => void;
  onEdit?: (note: Note) => void;
}

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
  const getPriorityVariant = useCallback((priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'destructive';
      case 'MEDIUM':
        return 'secondary';
      case 'LOW':
        return 'default';
      default:
        return 'outline';
    }
  }, []);

  const getPriorityIcon = useCallback((priority: string) => {
    const iconClass = 'h-4 w-4 mr-1 text-gray-200';
    switch (priority) {
      case 'HIGH':
        return <AlertTriangle className={iconClass} />;
      case 'MEDIUM':
        return <Minus className={iconClass} />;
      case 'LOW':
        return <ArrowDown className={iconClass} />;
      default:
        return <Info className={iconClass} />;
    }
  }, []);

  const formatDate = useCallback((date: Date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm');
  }, []);

  return (
    <Card className='flex flex-col justify-between min-h-[260px] shadow-md bg-gray-800 border border-gray-800 text-gray-200'>
      {/* Cabeçalho */}
      <CardHeader className='flex flex-row justify-between items-center'>
        <div className='flex items-center gap-2'>
          <CardTitle className='text-lg font-semibold'>{note.title}</CardTitle>
          {note.done && (
            <Badge className='bg-green-600 text-white hover:bg-green-700'>
              Concluída
            </Badge>
          )}
        </div>

        {/* Badge prioridade */}
        <Badge
          variant={getPriorityVariant(note.priority)}
          className='flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide'
        >
          {getPriorityIcon(note.priority)}
          {note.priority}
        </Badge>
      </CardHeader>

      {/* Conteúdo com scroll */}
      <CardContent className='flex-grow max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-1'>
        {note.content ? (
          <p className='text-gray-300 leading-relaxed'>{note.content}</p>
        ) : (
          <p className='text-gray-500 italic'>Sem conteúdo</p>
        )}
      </CardContent>

      {/* Footer com criação + vencimento + ações */}
      <CardFooter className='flex justify-between items-end text-xs text-gray-500 mt-auto'>
        <div className='flex flex-col gap-1'>
          {/* Vencimento */}
          {note.dueDate && (
            <div className='flex items-center text-orange-400 font-medium'>
              <Clock className='h-3 w-3 mr-1' />
              Vencimento: {formatDate(note.dueDate)}
            </div>
          )}
          {/* Data de criação */}
          <div className='flex items-center'>
            <CalendarIcon className='h-3 w-3 mr-1 text-gray-500' />
            Criado em {formatDate(note.createdAt)}
          </div>
        </div>

        <div className='flex gap-2'>
          {/* Editar */}
          <Button
            variant='outline'
            size='sm'
            className='border-gray-600 text-gray-400 hover:border-gray-500'
            onClick={() => onEdit?.(note)} // ✅ chama só se existir
          >
            <Pencil className='h-4 w-4' />
          </Button>

          {/* Marcar como concluído / pendente */}
          <Button
            variant='outline'
            size='sm'
            className='border-gray-600 text-gray-400 hover:border-gray-500'
          >
            {note.done ? (
              <X className='h-4 w-4' />
            ) : (
              <Check className='h-4 w-4' />
            )}
          </Button>

          {/* Excluir */}
          <Button
            variant='outline'
            size='sm'
            onClick={() => onDelete(note.id, note.title)}
            className='border-gray-600 text-gray-400 hover:border-gray-500'
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

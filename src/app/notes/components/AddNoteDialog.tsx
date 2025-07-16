'use client';

import { createNote } from '@/app/actions/create-note';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';
import { useState } from 'react';

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
  onNoteAdded: (note?: Note) => void; // Agora pode receber a nota criada
  userId: string;
}

const AddNoteDialog = ({
  visible,
  onHide,
  onNoteAdded,
  userId,
}: AddNoteDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH',
    dueDate: null as Date | null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const priorityOptions = [
    { label: 'Baixa', value: 'LOW', icon: 'pi pi-arrow-down' },
    { label: 'Média', value: 'MEDIUM', icon: 'pi pi-minus' },
    { label: 'Alta', value: 'HIGH', icon: 'pi pi-exclamation-triangle' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Título é obrigatório');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newNote = await createNote({
        userId,
        title: formData.title.trim(),
        content: formData.content.trim() || undefined,
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
      });

      // Reset form
      setFormData({
        title: '',
        content: '',
        priority: 'MEDIUM',
        dueDate: null,
      });

      onNoteAdded(newNote); // Passar a nova nota
      onHide();
    } catch (err) {
      console.error('Erro ao criar nota:', err);
      setError('Erro ao criar nota. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'MEDIUM',
      dueDate: null,
    });
    setError('');
    onHide();
  };

  const dialogFooter = (
    <div className='flex justify-end gap-2'>
      <Button
        label='Cancelar'
        icon='pi pi-times'
        outlined
        onClick={handleCancel}
        disabled={loading}
      />
      <Button
        label='Criar Nota'
        icon='pi pi-plus'
        loading={loading}
        onClick={handleSubmit}
        severity='success'
      />
    </div>
  );

  const priorityItemTemplate = (option: {
    label: string;
    value: string;
    icon: string;
  }) => {
    return (
      <div className='flex items-center gap-2'>
        <i className={option.icon}></i>
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <Dialog
      header={
        <div className='flex items-center gap-2'>
          <i className='pi pi-plus text-green-600'></i>
          <span>Nova Nota</span>
        </div>
      }
      visible={visible}
      onHide={onHide}
      footer={dialogFooter}
      style={{ width: '500px' }}
      modal
      className='p-fluid'
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && <Message severity='error' text={error} className='w-full' />}

        {/* Título */}
        <div className='field'>
          <label htmlFor='title' className='block text-sm font-medium mb-2'>
            Título *
          </label>
          <InputText
            id='title'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder='Digite o título da nota...'
            className='w-full'
            disabled={loading}
            autoFocus
          />
        </div>

        {/* Conteúdo */}
        <div className='field'>
          <label htmlFor='content' className='block text-sm font-medium mb-2'>
            Conteúdo
          </label>
          <InputTextarea
            id='content'
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder='Digite o conteúdo da nota...'
            rows={4}
            className='w-full'
            disabled={loading}
          />
        </div>

        {/* Prioridade */}
        <div className='field'>
          <label htmlFor='priority' className='block text-sm font-medium mb-2'>
            Prioridade
          </label>
          <Dropdown
            id='priority'
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.value })}
            options={priorityOptions}
            itemTemplate={priorityItemTemplate}
            valueTemplate={priorityItemTemplate}
            className='w-full'
            disabled={loading}
          />
        </div>

        {/* Data de Vencimento */}
        <div className='field'>
          <label htmlFor='dueDate' className='block text-sm font-medium mb-2'>
            Data de Vencimento (opcional)
          </label>
          <Calendar
            id='dueDate'
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.value as Date })
            }
            showTime
            hourFormat='24'
            placeholder='Selecione uma data...'
            className='w-full'
            disabled={loading}
            minDate={new Date()}
            dateFormat='dd/mm/yy'
          />
        </div>
      </form>
    </Dialog>
  );
};

export default AddNoteDialog;

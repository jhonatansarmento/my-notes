'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, Plus } from 'lucide-react';

interface NotesStatsProps {
  notesCount: number;
  completedCount: number;
  pendingCount: number;
  highCount: number;
  onAdd: () => void;
}

export default function NotesStats({
  notesCount,
  completedCount,
  pendingCount,
  highCount,
  onAdd,
}: NotesStatsProps) {
  return (
    <div className='space-y-4'>
      {/* Header lateral */}
      <Card className='bg-gray-800 border border-gray-700 text-gray-200 shadow-md'>
        <CardHeader className='flex flex-col space-y-3'>
          <CardTitle className='flex items-center gap-2 text-xl font-bold text-gray-100'>
            <ListChecks className='h-5 w-5 text-blue-400' />
            Suas Notas
          </CardTitle>
          <p className='text-xs text-gray-400 leading-snug'>
            Organize suas ideias e tarefas de forma eficiente
          </p>

          <Button
            onClick={onAdd}
            size='sm'
            className='flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white text-xs'
          >
            <Plus className='h-3.5 w-3.5' />
            Nova Nota
          </Button>
        </CardHeader>
      </Card>

      {/* Estatísticas minimalistas */}
      <div className='grid grid-cols-2 gap-2'>
        {/* Total */}
        <Card className='bg-gray-800 border border-gray-700 text-center rounded-md'>
          <CardContent className='py-2 px-1'>
            <div className='text-base font-semibold text-blue-400'>
              {notesCount}
            </div>
            <div className='text-[10px] text-gray-400 uppercase tracking-wide'>
              Total
            </div>
          </CardContent>
        </Card>

        {/* Concluídas */}
        <Card className='bg-gray-800 border border-gray-700 text-center rounded-md'>
          <CardContent className='py-2 px-1'>
            <div className='text-base font-semibold text-green-400'>
              {completedCount}
            </div>
            <div className='text-[10px] text-gray-400 uppercase tracking-wide'>
              Concluídas
            </div>
          </CardContent>
        </Card>

        {/* Pendentes */}
        <Card className='bg-gray-800 border border-gray-700 text-center rounded-md'>
          <CardContent className='py-2 px-1'>
            <div className='text-base font-semibold text-yellow-400'>
              {pendingCount}
            </div>
            <div className='text-[10px] text-gray-400 uppercase tracking-wide'>
              Pendentes
            </div>
          </CardContent>
        </Card>

        {/* Alta Prioridade */}
        <Card className='bg-gray-800 border border-gray-700 text-center rounded-md'>
          <CardContent className='py-2 px-1'>
            <div className='text-base font-semibold text-red-400'>
              {highCount}
            </div>
            <div className='text-[10px] text-gray-400 uppercase tracking-wide'>
              Alta
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

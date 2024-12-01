'use client'

import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { ServicosFilters } from '@/components/dashboard/servicos/servicos-filters';
import { ServicosTable } from '@/components/dashboard/servicos/servicos-table';
import type { Servicos } from '@/components/dashboard/servicos/servicos-table';

// export const metadata = { title: `Serviços | Dashboard | ${config.site.name}` } satisfies Metadata;

// const servicos = [
//   {
//     id: 'USR-010',
//     nome_servico: 'Alcides Antonio',

//   },
//   {
//     id: 'USR-009',
//     nome_servico: 'Marcus Finn',
//   },
//   {
//     id: 'USR-008',
//     nome_servico: 'Jie Yan',
//   },
//   {
//     id: 'USR-007',
//     nome_servico: 'Nasimiyu Danai',
//   },
//   {
//     id: 'USR-006',
//     nome_servico: 'Iulia Albu',
//   },
//   {
//     id: 'USR-005',
//     nome_servico: 'Fran Perez',
//   },

//   {
//     id: 'USR-004',
//     nome_servico: 'Penjani Inyene',
//   },
//   {
//     id: 'USR-003',
//     nome_servico: 'Carson Darrin',
//   },
//   {
//     id: 'USR-002',
//     nome_servico: 'Siegbert Gottfried',
//   },
//   {
//     id: 'USR-001',
//     nome_servico: 'Miron Vitold',
//   },
// ] satisfies Servicos[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 10;

  const [servicos, setServicos] = React.useState<Servicos[]>([]);  // Estado para armazenar os serviços




  React.useEffect(() => {
    fetch('http://localhost:3000/api/servicos')
      .then((response) => response.json())
      .then((data) => {
        // Verificar se o campo 'servicos' existe e é um array
        if (data && Array.isArray(data.servicos)) {
          setServicos(data.servicos);  // Armazenar o array de serviços no estado
        } else {
          console.error('Erro: A resposta da API não contém a chave "servicos" como um array.');
        }
      })
      .catch((error) => console.error('Erro ao buscar os serviços:', error));
  }, []);



  const paginatedCustomers = applyPagination(servicos, page, rowsPerPage);

  // Função para mudar a página


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Serviços</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <ServicosFilters />
      <ServicosTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

const applyPagination = (data: Servicos[], page: number, rowsPerPage: number): Servicos[] => {
  // Garantir que 'data' seja um array
  if (!Array.isArray(data)) {
    console.error('A função applyPagination recebeu dados inválidos:', data);
    return []; // Retorna um array vazio caso os dados não sejam um array
  }

  // Calcular os índices para aplicar a paginação
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Retorna a fatia dos dados que devem ser exibidos
  return data.slice(startIndex, endIndex);
};

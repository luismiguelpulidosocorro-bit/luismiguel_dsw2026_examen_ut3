import { randomUUID } from 'node:crypto';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError.js';

interface Notice {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

// Datos en memoria: se pierden cada vez que el servidor se reinicia.
const notices: Notice[] = [
  {
    id: '33333333-3333-4333-8333-333333333333',
    title: 'Plazo de Matrícula 2026/27',
    description: 'Del 1 al 15 de julio en la secretaría del centro.',
    createdAt: '2026-06-10T09:00:00.000Z',
  },
  {
    id: '44444444-4444-4444-8444-444444444444',
    title: 'Documentación necesaria para la matrícula',
    description: 'DNI, fotografía y justificante de pago de la tasa.',
    createdAt: '2026-06-12T10:30:00.000Z',
  },
  {
    id: '55555555-5555-4555-8555-555555555555',
    title: 'Cambio de horario de secretaría en época de matrícula',
    description: 'Atención de 9:00 a 13:00 durante todo el mes de julio.',
    createdAt: '2026-06-20T08:15:00.000Z',
  },
  {
    id: '66666666-6666-4666-8666-666666666666',
    title: 'Reunión de familias de 1.º ESO',
    description: 'Jueves a las 18:00 en el salón de actos.',
    createdAt: '2026-09-05T12:00:00.000Z',
  },
  {
    id: '77777777-7777-4777-8777-777777777777',
    title: 'Reunión del claustro',
    description: 'Orden del día disponible en la sala de profesorado.',
    createdAt: '2026-09-08T07:45:00.000Z',
  },
  {
    id: '99999999-9999-4999-8999-999999999999',
    title: 'Calendario de exámenes de la primera evaluación',
    description: 'Del 15 al 19 de diciembre, consultar horarios por curso.',
    createdAt: '2026-11-20T09:30:00.000Z',
  },
  {
    id: '88888888-8888-4888-8888-888888888888',
    title: 'Excursión al Parque Nacional del Teide',
    description: 'Autorizaciones firmadas antes del viernes.',
    createdAt: '2026-10-02T11:20:00.000Z',
  },
  {
    id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    title: 'Examen de recuperación de Matemáticas',
    description: 'Aula 204, lunes a las 10:00.',
    createdAt: '2026-11-22T08:00:00.000Z',
  },
];

// Minúsculas y sin tildes: "matricula" encuentra "Matrícula".
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function list(page: number, limit: number, search?: string) {
  const term = normalize((search ?? '').trim());

  // Si no hay término de búsqueda no se filtra por título.
  const filtered = term === '' ? notices : notices.filter((n) => normalize(n.title).includes(term));

  // total se calcula ANTES de paginar.
  const start = (page - 1) * limit;

  return {
    data: filtered.slice(start, start + limit),
    total: filtered.length,
  };
}

// POST /api/v1/notices
export function create(title: string, description?: string): Notice {
  const notice: Notice = {
    id: randomUUID(),
    title: title.trim(),
    description: description ?? '',
    createdAt: new Date().toISOString(),
  };
  notices.push(notice);
  return notice;
}

// GET /api/v1/notices/:noticeId
export function getById(noticeId: string): Notice {
  const notice = notices.find((n) => n.id === noticeId);

  if (!notice) {
    throw new ResourceNotFoundError(
      404,
      `Notice with id '${noticeId}' not found`,
      noticeId,
      'RESOURCE_NOT_FOUND',
    );
  }

  return notice;
}

// PATCH /api/v1/notices/:noticeId
export function update(noticeId: string, title?: string, description?: string): Notice {
  const notice = getById(noticeId);

  if (title !== undefined) {
    notice.title = title.trim();
  }
  if (description !== undefined) {
    notice.description = description;
  }
  return notice;
}
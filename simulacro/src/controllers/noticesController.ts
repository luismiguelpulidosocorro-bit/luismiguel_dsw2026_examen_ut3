import type { Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';
import * as noticesService from '../services/noticesService.js';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 2;

// Solo acepta cadenas de dígitos ("1", "25"); rechaza "0", "-1", "1.5", "abc", "0x10", "1e1" o arrays.
function parsePositiveInt(value: unknown, fallback: number, name: string, code: string): number {
  if (value === undefined) {
    return fallback;
  }
  if (typeof value !== 'string' || !/^\d+$/.test(value) || Number(value) < 1) {
    throw new AppError(400, `${name} must be an integer greater than 0`, code);
  }
  return Number(value);
}

function validateTitle(title: unknown): asserts title is string {
  if (typeof title !== 'string' || title.trim() === '') {
    throw new AppError(400, 'Title must be a non-empty string', 'INVALID_TITLE');
  }
}

function validateDescription(description: unknown): asserts description is string | undefined {
  if (description !== undefined && typeof description !== 'string') {
    throw new AppError(400, 'Description must be a string', 'INVALID_DESCRIPTION');
  }
}

export function list(req: Request, res: Response): void {
  const page = parsePositiveInt(req.query.page, DEFAULT_PAGE, 'page', 'INVALID_PAGE');
  const limit = parsePositiveInt(req.query.limit, DEFAULT_LIMIT, 'limit', 'INVALID_LIMIT');

  const search = req.query.search;
  if (search !== undefined && typeof search !== 'string') {
    throw new AppError(400, 'search must be a string', 'INVALID_SEARCH');
  }

  const { data, total } = noticesService.list(page, limit, search);
  res.json({ data, pagination: { page, limit, total } });
}

export function getById(req: Request, res: Response): void {
  const notice = noticesService.getById(String(req.params.noticeId));
  res.json({ data: notice });
}

export function create(req: Request, res: Response): void {
  const { title, description } = req.body ?? {};

  validateTitle(title);
  validateDescription(description);

  const notice = noticesService.create(title, description);
  res.status(201).json({ data: notice });
}

// PATCH /api/v1/notices/:noticeId
export function update(req: Request, res: Response): void {
  const { title, description } = req.body ?? {};

  // En un PATCH ningún campo es obligatorio, pero los que lleguen deben ser válidos.
  if (title !== undefined) {
    validateTitle(title);
  }
  validateDescription(description);

  const notice = noticesService.update(String(req.params.noticeId), title, description);
  res.json({ data: notice });
}
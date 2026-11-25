import type { Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';
import * as noticesService from '../services/noticesService.js';

const MAX_LIMIT = 100;

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
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 20);

  if (!Number.isInteger(page) || page < 1) {
    throw new AppError(400, 'page must be an integer greater than or equal to 1', 'INVALID_PAGE');
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
    throw new AppError(400, `limit must be an integer between 1 and ${MAX_LIMIT}`, 'INVALID_LIMIT');
  }

  const { data, total } = noticesService.list(page, limit);
  res.json({ data, pagination: { total, page, limit } });
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
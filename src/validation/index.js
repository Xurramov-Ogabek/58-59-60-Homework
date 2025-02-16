export * from './login.js';
import { z } from 'zod';

export const userRegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
  email: z.string().email(),
});

/* 


- **search**: `?search=konsert` — `title` yoki `description` da so‘z qidirish (`$regex`).
- **category**: `?category=sport` — qaysi turdagi chiptalarni filter qilish.
- **date**: `?date[gte]=2025-01-01&date[lte]=2025-12-31` — oraliqda filter.
- **sort**: `?sort=-price` (minus narx demak kamayish tartibida) yoki `?sort=date` (o‘sish tartibida).
- **pagination**: `?page=2&limit=20
*/

// query schema

export const ticketQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(['price', 'date']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

export const ticketSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  status: z.string(),
  price: z.number(),
  date: z.date(),
  location: z.string(),
  totalQuantity: z.number(),
});

// paginationschema
export const paginationSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  orderBy: z.enum(['ASC', 'DESC']).optional(),
});

//params schema

export const ticketIdSchema = z.object({
  ticketId: z.string(),
});
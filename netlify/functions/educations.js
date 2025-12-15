import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { education } from '../../db/schema.js';
import { formatCollection, formatSingle, formatError, camelizeKeys } from './lib/jsonapi.js';
import { requireAuth, unauthorizedResponse } from './lib/auth.js';

/**
 * Netlify Function for /educations endpoint
 * Handles full CRUD operations for education records
 */
export default async (req, context) => {
  // Extract ID from URL path (e.g., /educations/1 → id = "1")
  const pathParts = req.url.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 1];
  const isIdRequest = id && !isNaN(id);

  try {
    // ===== GET /educations - List all education records =====
    if (req.method === 'GET' && !isIdRequest) {
      const allEducation = await db.select().from(education);

      return new Response(
        JSON.stringify(formatCollection('education', allEducation)),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== GET /educations/:id - Show one education record =====
    if (req.method === 'GET' && isIdRequest) {
      const result = await db
        .select()
        .from(education)
        .where(eq(education.id, parseInt(id)));

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Education record with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('education', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== POST /educations - Create new education record =====
    if (req.method === 'POST') {
      if (!requireAuth(req)) {
        return unauthorizedResponse();
      }
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      const result = await db
        .insert(education)
        .values({
          degree: attrs.degree,
          fieldOfStudy: attrs.fieldOfStudy,
          institution: attrs.institution,
          graduationYear: attrs.graduationYear
        })
        .returning();

      return new Response(
        JSON.stringify(formatSingle('education', result[0])),
        {
          status: 201,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== PUT/PATCH /educations/:id - Update education record =====
    if ((req.method === 'PUT' || req.method === 'PATCH') && isIdRequest) {
      if (!requireAuth(req)) {
        return unauthorizedResponse();
      }
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      const result = await db
        .update(education)
        .set({
          degree: attrs.degree,
          fieldOfStudy: attrs.fieldOfStudy,
          institution: attrs.institution,
          graduationYear: attrs.graduationYear,
          updatedAt: new Date()
        })
        .where(eq(education.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Education record with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('education', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== DELETE /educations/:id - Delete education record =====
    if (req.method === 'DELETE' && isIdRequest) {
      if (!requireAuth(req)) {
        return unauthorizedResponse();
      }
      const result = await db
        .delete(education)
        .where(eq(education.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Education record with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(null, { status: 204 });
    }

    // ===== Method not allowed =====
    return new Response(
      JSON.stringify(formatError(405, 'Method Not Allowed', `${req.method} is not supported`)),
      {
        status: 405,
        headers: { 'Content-Type': 'application/vnd.api+json' }
      }
    );

  } catch (error) {
    console.error('Error in education function:', error);
    return new Response(
      JSON.stringify(formatError(500, 'Internal Server Error', error.message)),
      {
        status: 500,
        headers: { 'Content-Type': 'application/vnd.api+json' }
      }
    );
  }
};


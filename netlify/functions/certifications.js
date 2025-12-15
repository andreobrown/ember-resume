import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { certifications } from '../../db/schema.js';
import { formatCollection, formatSingle, formatError, camelizeKeys } from './lib/jsonapi.js';
import { requireAuth, unauthorizedResponse } from './lib/auth.js';

/**
 * Netlify Function for /certifications endpoint
 * Handles full CRUD operations for certifications
 */
export default async (req, context) => {
  // Extract ID from URL path (e.g., /certifications/1 → id = "1")
  const pathParts = req.url.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 1];
  const isIdRequest = id && !isNaN(id);

  try {
    // ===== GET /certifications - List all certifications =====
    if (req.method === 'GET' && !isIdRequest) {
      const allCertifications = await db.select().from(certifications);

      return new Response(
        JSON.stringify(formatCollection('certifications', allCertifications)),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== GET /certifications/:id - Show one certification =====
    if (req.method === 'GET' && isIdRequest) {
      const result = await db
        .select()
        .from(certifications)
        .where(eq(certifications.id, parseInt(id)));

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Certification with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('certifications', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== POST /certifications - Create new certification =====
    if (req.method === 'POST') {
      if (!requireAuth(req)) {
        return unauthorizedResponse();
      }
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      const result = await db
        .insert(certifications)
        .values({
          name: attrs.name,
          issuer: attrs.issuer,
          dateEarned: attrs.dateEarned ? new Date(attrs.dateEarned) : null
        })
        .returning();

      return new Response(
        JSON.stringify(formatSingle('certifications', result[0])),
        {
          status: 201,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== PUT/PATCH /certifications/:id - Update certification =====
    if ((req.method === 'PUT' || req.method === 'PATCH') && isIdRequest) {
      if (!requireAuth(req)) {
        return unauthorizedResponse();
      }
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      const result = await db
        .update(certifications)
        .set({
          name: attrs.name,
          issuer: attrs.issuer,
          dateEarned: attrs.dateEarned ? new Date(attrs.dateEarned) : null,
          updatedAt: new Date()
        })
        .where(eq(certifications.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Certification with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('certifications', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== DELETE /certifications/:id - Delete certification =====
    if (req.method === 'DELETE' && isIdRequest) {
      if (!requireAuth(req)) {
        return unauthorizedResponse();
      }
      const result = await db
        .delete(certifications)
        .where(eq(certifications.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Certification with id ${id} not found`)),
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
    console.error('Error in certifications function:', error);
    return new Response(
      JSON.stringify(formatError(500, 'Internal Server Error', error.message)),
      {
        status: 500,
        headers: { 'Content-Type': 'application/vnd.api+json' }
      }
    );
  }
};
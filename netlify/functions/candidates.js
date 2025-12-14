import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { candidates } from '../../db/schema.js';
import { formatCollection, formatSingle, formatError } from './lib/jsonapi.js';

/**
 * Netlify Function for /candidates endpoint
 * Handles full CRUD operations for candidates
 */
export default async (req, context) => {
  // Extract ID from URL path (e.g., /candidates/1 → id = "1")
  const pathParts = req.url.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 1];
  const isIdRequest = id && !isNaN(id);

  try {
    // ===== GET /candidates - List all candidates =====
    if (req.method === 'GET' && !isIdRequest) {
      const allCandidates = await db.select().from(candidates);

      return new Response(
        JSON.stringify(formatCollection('candidates', allCandidates)),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== GET /candidates/:id - Show one candidate =====
    if (req.method === 'GET' && isIdRequest) {
      const result = await db
        .select()
        .from(candidates)
        .where(eq(candidates.id, parseInt(id)));

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Candidate with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('candidates', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== POST /candidates - Create new candidate =====
    if (req.method === 'POST') {
      const body = await req.json();
      const attrs = body.data.attributes;

      const result = await db
        .insert(candidates)
        .values({
          name: attrs.name,
          tagline: attrs.tagline,
          email: attrs.email,
          phone: attrs.phone,
          location: attrs.location,
          website: attrs.website,
          linkedin: attrs.linkedin,
          profile: attrs.profile,
          skills: attrs.skills
        })
        .returning();

      return new Response(
        JSON.stringify(formatSingle('candidates', result[0])),
        {
          status: 201,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== PUT/PATCH /candidates/:id - Update candidate =====
if ((req.method === 'PUT' || req.method === 'PATCH') && isIdRequest) {
      const body = await req.json();
      const attrs = body.data.attributes;

      const result = await db
        .update(candidates)
        .set({
          name: attrs.name,
          tagline: attrs.tagline,
          email: attrs.email,
          phone: attrs.phone,
          location: attrs.location,
          website: attrs.website,
          linkedin: attrs.linkedin,
          profile: attrs.profile,
          skills: attrs.skills,
          updatedAt: new Date()
        })
        .where(eq(candidates.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Candidate with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('candidates', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== DELETE /candidates/:id - Delete candidate =====
    if (req.method === 'DELETE' && isIdRequest) {
      const result = await db
        .delete(candidates)
        .where(eq(candidates.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Candidate with id ${id} not found`)),
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
    console.error('Error in candidates function:', error);
    return new Response(
      JSON.stringify(formatError(500, 'Internal Server Error', error.message)),
      {
        status: 500,
        headers: { 'Content-Type': 'application/vnd.api+json' }
      }
    );
  }
};

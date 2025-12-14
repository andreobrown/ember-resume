import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { achievements } from '../../db/schema.js';
import { formatCollection, formatSingle, formatError, camelizeKeys } from './lib/jsonapi.js';

/**
 * Netlify Function for /achievements endpoint
 * Handles CRUD operations for achievements (belongs to work experience)
 */
export default async (req, context) => {
  // Extract ID from URL path
  const pathParts = req.url.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 1];
  const isIdRequest = id && !isNaN(id);

  try {
    // ===== GET /achievements - List all achievements =====
    if (req.method === 'GET' && !isIdRequest) {
      const allAchievements = await db.select().from(achievements);

      return new Response(
        JSON.stringify(formatCollection('achievements', allAchievements)),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== GET /achievements/:id - Show one achievement =====
    if (req.method === 'GET' && isIdRequest) {
      const result = await db
        .select()
        .from(achievements)
        .where(eq(achievements.id, parseInt(id)));

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Achievement with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('achievements', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== POST /achievements - Create new achievement =====
    if (req.method === 'POST') {
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      // Extract work experience ID from relationships (JSON:API format)
      const workExperienceId = body.data.relationships?.['work-experience']?.data?.id;

      const result = await db
        .insert(achievements)
        .values({
          content: attrs.content,
          sortOrder: attrs.sortOrder || 0,
          workExperienceId: workExperienceId ? parseInt(workExperienceId) : null
        })
        .returning();

      return new Response(
        JSON.stringify(formatSingle('achievements', result[0])),
        {
          status: 201,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== PUT/PATCH /achievements/:id - Update achievement =====
    if ((req.method === 'PUT' || req.method === 'PATCH') && isIdRequest) {
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      // Extract work experience ID from relationships (JSON:API format)
      const workExperienceId = body.data.relationships?.['work-experience']?.data?.id;

      const result = await db
        .update(achievements)
        .set({
          content: attrs.content,
          sortOrder: attrs.sortOrder,
          workExperienceId: workExperienceId ? parseInt(workExperienceId) : null,
          updatedAt: new Date()
        })
        .where(eq(achievements.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Achievement with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('achievements', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== DELETE /achievements/:id - Delete achievement =====
    if (req.method === 'DELETE' && isIdRequest) {
      const result = await db
        .delete(achievements)
        .where(eq(achievements.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Achievement with id ${id} not found`)),
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
    console.error('Error in achievements function:', error);
    return new Response(
      JSON.stringify(formatError(500, 'Internal Server Error', error.message)),
      {
        status: 500,
        headers: { 'Content-Type': 'application/vnd.api+json' }
      }
    );
  }
};

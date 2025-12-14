import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { workExperiences, jobTitles, responsibilities, achievements } from '../../db/schema.js';
import { formatCollection, formatSingle, formatResource, formatError, camelizeKeys } from './lib/jsonapi.js';

/**
 * Netlify Function for /work-experiences endpoint
 * Handles CRUD operations for work experiences
 */
export default async (req, context) => {
  // Extract ID from URL path (e.g., /work-experiences/1 → id = "1")
  const pathParts = req.url.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 1];
  const isIdRequest = id && !isNaN(id);

  try {
    // ===== GET /work-experiences - List all work experiences =====
    if (req.method === 'GET' && !isIdRequest) {
      const allWorkExperiences = await db.select().from(workExperiences);

      return new Response(
        JSON.stringify(formatCollection('work-experiences', allWorkExperiences)),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== GET /work-experiences/:id - Show one work experience with relationships =====
    if (req.method === 'GET' && isIdRequest) {
      const workExpId = parseInt(id);

      // Get the work experience
      const result = await db
        .select()
        .from(workExperiences)
        .where(eq(workExperiences.id, workExpId));

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Work experience with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      // Get related job titles
      const relatedJobTitles = await db
        .select()
        .from(jobTitles)
        .where(eq(jobTitles.workExperienceId, workExpId));

      // Get related responsibilities
      const relatedResponsibilities = await db
        .select()
        .from(responsibilities)
        .where(eq(responsibilities.workExperienceId, workExpId));

      // Get related achievements
      const relatedAchievements = await db
        .select()
        .from(achievements)
        .where(eq(achievements.workExperienceId, workExpId));

      // Build relationships object (type/id pairs for EmberData)
      const relationshipsData = {
        'job-titles': {
          data: relatedJobTitles.map(jt => ({ type: 'job-titles', id: String(jt.id) }))
        },
        'responsibilities': {
          data: relatedResponsibilities.map(r => ({ type: 'responsibilities', id: String(r.id) }))
        },
        'achievements': {
          data: relatedAchievements.map(a => ({ type: 'achievements', id: String(a.id) }))
        }
      };

      // Build included array (full records sideloaded)
      const included = [
        ...relatedJobTitles.map(jt => formatResource('job-titles', jt)),
        ...relatedResponsibilities.map(r => formatResource('responsibilities', r)),
        ...relatedAchievements.map(a => formatResource('achievements', a))
      ];

      // Return compound document
      return new Response(
        JSON.stringify({
          data: formatResource('work-experiences', result[0], relationshipsData),
          included: included.length > 0 ? included : undefined
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== POST /work-experiences - Create new work experience =====
    if (req.method === 'POST') {
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      const result = await db
        .insert(workExperiences)
        .values({
          company: attrs.company,
          location: attrs.location
        })
        .returning();

      return new Response(
        JSON.stringify(formatSingle('work-experiences', result[0])),
        {
          status: 201,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== PUT/PATCH /work-experiences/:id - Update work experience =====
    if ((req.method === 'PUT' || req.method === 'PATCH') && isIdRequest) {
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      const result = await db
        .update(workExperiences)
        .set({
          company: attrs.company,
          location: attrs.location,
          updatedAt: new Date()
        })
        .where(eq(workExperiences.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Work experience with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('work-experiences', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== DELETE /work-experiences/:id - Delete work experience =====
    if (req.method === 'DELETE' && isIdRequest) {
      const result = await db
        .delete(workExperiences)
        .where(eq(workExperiences.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Work experience with id ${id} not found`)),
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
    console.error('Error in work-experiences function:', error);
    return new Response(
      JSON.stringify(formatError(500, 'Internal Server Error', error.message)),
      {
        status: 500,
        headers: { 'Content-Type': 'application/vnd.api+json' }
      }
    );
  }
};

import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { jobTitles } from '../../db/schema.js';
import { formatCollection, formatSingle, formatError, camelizeKeys } from './lib/jsonapi.js';
import { requireAuth, unauthorizedResponse } from './lib/auth.js';

/**
 * Netlify Function for /job-titles endpoint
 * Handles CRUD operations for job titles (belongs to work experience)
 */
export default async (req, context) => {
  // Extract ID from URL path
  const pathParts = req.url.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 1];
  const isIdRequest = id && !isNaN(id);

  try {
    // ===== GET /job-titles - List all job titles =====
    if (req.method === 'GET' && !isIdRequest) {
      const allJobTitles = await db.select().from(jobTitles);

      return new Response(
        JSON.stringify(formatCollection('job-titles', allJobTitles)),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== GET /job-titles/:id - Show one job title =====
    if (req.method === 'GET' && isIdRequest) {
      const result = await db
        .select()
        .from(jobTitles)
        .where(eq(jobTitles.id, parseInt(id)));

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Job title with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('job-titles', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== POST /job-titles - Create new job title =====
    if (req.method === 'POST') {
      if (!requireAuth(req)) {
        return unauthorizedResponse();
      }
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      // Extract work experience ID from relationships (JSON:API format)
      const workExperienceId = body.data.relationships?.['work-experience']?.data?.id;

      const result = await db
        .insert(jobTitles)
        .values({
          title: attrs.title,
          startDate: attrs.startDate ? new Date(attrs.startDate) : null,
          endDate: attrs.endDate ? new Date(attrs.endDate) : null,
          isLeadership: attrs.isLeadership || false,
          workExperienceId: workExperienceId ? parseInt(workExperienceId) : null
        })
        .returning();

      return new Response(
        JSON.stringify(formatSingle('job-titles', result[0])),
        {
          status: 201,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== PUT/PATCH /job-titles/:id - Update job title =====
    if ((req.method === 'PUT' || req.method === 'PATCH') && isIdRequest) {
      if (!requireAuth(req)) {
        return unauthorizedResponse();
      }
      const body = await req.json();
      const attrs = camelizeKeys(body.data.attributes);

      // Extract work experience ID from relationships (JSON:API format)
      const workExperienceId = body.data.relationships?.['work-experience']?.data?.id;

      const result = await db
        .update(jobTitles)
        .set({
          title: attrs.title,
          startDate: attrs.startDate ? new Date(attrs.startDate) : null,
          endDate: attrs.endDate ? new Date(attrs.endDate) : null,
          isLeadership: attrs.isLeadership,
          workExperienceId: workExperienceId ? parseInt(workExperienceId) : null,
          updatedAt: new Date()
        })
        .where(eq(jobTitles.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Job title with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('job-titles', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== DELETE /job-titles/:id - Delete job title =====
    if (req.method === 'DELETE' && isIdRequest) {
      if (!requireAuth(req)) {
        return unauthorizedResponse();
      }
      const result = await db
        .delete(jobTitles)
        .where(eq(jobTitles.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Job title with id ${id} not found`)),
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
    console.error('Error in job-titles function:', error);
    return new Response(
      JSON.stringify(formatError(500, 'Internal Server Error', error.message)),
      {
        status: 500,
        headers: { 'Content-Type': 'application/vnd.api+json' }
      }
    );
  }
};

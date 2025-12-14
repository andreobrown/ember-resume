import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { projects } from '../../db/schema.js';
import { formatCollection, formatSingle, formatError } from './lib/jsonapi.js';

/**
 * Netlify Function for /projects endpoint
 * Handles full CRUD operations for projects
 */
export default async (req, context) => {
  // Extract ID from URL path (e.g., /projects/1 → id = "1")
  const pathParts = req.url.split('/').filter(Boolean);
  const id = pathParts[pathParts.length - 1];
  const isIdRequest = id && !isNaN(id);

  try {
    // ===== GET /projects - List all projects =====
    if (req.method === 'GET' && !isIdRequest) {
      const allProjects = await db.select().from(projects);

      return new Response(
        JSON.stringify(formatCollection('projects', allProjects)),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== GET /projects/:id - Show one project =====
    if (req.method === 'GET' && isIdRequest) {
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.id, parseInt(id)));

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Project with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('projects', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== POST /projects - Create new project =====
    if (req.method === 'POST') {
      const body = await req.json();
      const attrs = body.data.attributes;

      const result = await db
        .insert(projects)
        .values({
          name: attrs.name,
          description: attrs.description,
          technologies: attrs.technologies,
          url: attrs.url
        })
        .returning();

      return new Response(
        JSON.stringify(formatSingle('projects', result[0])),
        {
          status: 201,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== PUT/PATCH /projects/:id - Update project =====
    if ((req.method === 'PUT' || req.method === 'PATCH') && isIdRequest) {
      const body = await req.json();
      const attrs = body.data.attributes;

      const result = await db
        .update(projects)
        .set({
          name: attrs.name,
          description: attrs.description,
          technologies: attrs.technologies,
          url: attrs.url,
          updatedAt: new Date()
        })
        .where(eq(projects.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Project with id ${id} not found`)),
          {
            status: 404,
            headers: { 'Content-Type': 'application/vnd.api+json' }
          }
        );
      }

      return new Response(
        JSON.stringify(formatSingle('projects', result[0])),
        {
          status: 200,
          headers: { 'Content-Type': 'application/vnd.api+json' }
        }
      );
    }

    // ===== DELETE /projects/:id - Delete project =====
    if (req.method === 'DELETE' && isIdRequest) {
      const result = await db
        .delete(projects)
        .where(eq(projects.id, parseInt(id)))
        .returning();

      if (result.length === 0) {
        return new Response(
          JSON.stringify(formatError(404, 'Not Found', `Project with id ${id} not found`)),
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
    console.error('Error in projects function:', error);
    return new Response(
      JSON.stringify(formatError(500, 'Internal Server Error', error.message)),
      {
        status: 500,
        headers: { 'Content-Type': 'application/vnd.api+json' }
      }
    );
  }
};

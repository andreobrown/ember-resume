// Helper functions to format JSON:API responses
// JSON:API spec: https://jsonapi.org/

/**
 * Format a single record as JSON:API resource object
 */
export function formatResource(type, record, relationships = {}) {
  const { id, createdAt, updatedAt, ...attributes } = record;

  const resource = {
    type,
    id: String(id),
    attributes
  };

  if (Object.keys(relationships).length > 0) {
    resource.relationships = relationships;
  }

  return resource;
}

/**
 * Format multiple records as JSON:API collection
 */
export function formatCollection(type, records) {
  return {
    data: records.map(record => formatResource(type, record))
  };
}

/**
 * Format a single record as JSON:API response
 */
export function formatSingle(type, record, relationships = {}) {
  return {
    data: formatResource(type, record, relationships)
  };
}

/**
 * Format an error response
 */
export function formatError(status, title, detail) {
  return {
    errors: [{
      status: String(status),
      title,
      detail
    }]
  };
}

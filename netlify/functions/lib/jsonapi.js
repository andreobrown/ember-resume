// Helper functions to format JSON:API responses
// JSON:API spec: https://jsonapi.org/

/**
 * Convert camelCase to dash-case (JSON:API standard)
 */
function dasherize(str) {
  return str.replace(/[A-Z]/g, (char, index) => 
    (index > 0 ? '-' : '') + char.toLowerCase()
  );
}

/**
 * Transform object keys from camelCase to dash-case
 */
function dasherizeKeys(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  
  const dasherized = {};
  for (const [key, value] of Object.entries(obj)) {
    dasherized[dasherize(key)] = value;
  }
  return dasherized;
}

/**
 * Convert dash-case to camelCase
 */
function camelize(str) {
  return str.replace(/-([a-z])/g, (match, char) => char.toUpperCase());
}

/**
 * Transform object keys from dash-case to camelCase (for database)
 */
export function camelizeKeys(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  
  const camelized = {};
  for (const [key, value] of Object.entries(obj)) {
    camelized[camelize(key)] = value;
  }
  return camelized;
}

/**
 * Format a single record as JSON:API resource object
 */
export function formatResource(type, record, relationships = {}) {
  const { id, createdAt, updatedAt, ...attributes } = record;

  const resource = {
    type,
    id: String(id),
    attributes: dasherizeKeys(attributes)
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

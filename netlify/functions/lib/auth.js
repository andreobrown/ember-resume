import 'dotenv/config';

/**
 * Check if request has valid authorization token
 * @param {Request} req - The incoming request
 * @returns {boolean} - Whether the request is authorized
 */
export function requireAuth(req) {
  const authHeader = req.headers.get('authorization');
  const expectedToken = `Bearer ${process.env.AUTH_TOKEN}`;

  return authHeader === expectedToken;
}

/**
 * Create a 401 Unauthorized response
 * @returns {Response} - 401 response
 */
export function unauthorizedResponse() {
  return new Response(
    JSON.stringify({
      errors: [{
        status: '401',
        title: 'Unauthorized',
        detail: 'Authentication required'
      }]
    }),
    {
      status: 401,
      headers: { 'Content-Type': 'application/vnd.api+json' }
    }
  );
}

import 'dotenv/config';

/**
 * Netlify Function for /auth endpoint
 * Validates admin credentials and returns auth token
 */

export default async (req, context) => {
  // Only accept POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const { username, password } = body;

    // Validate credentials against environment variables
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;
    const authToken = process.env.AUTH_TOKEN;

    if (username === validUsername && password === validPassword) {
      // Success - return token
      return new Response(
        JSON.stringify({
          token: authToken,
          user: { name: 'Admin' }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Invalid credentials
      return new Response(
        JSON.stringify({ error: 'Invalid username or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return new Response(
      JSON.stringify({ error: 'Authentication failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

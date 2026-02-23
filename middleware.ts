export default function middleware(request: Request) {
  const auth = request.headers.get('authorization');

  if (auth) {
    const encoded = auth.split(' ')[1];
    const decoded = atob(encoded);
    const password = decoded.split(':')[1];

    if (password === 'salame2') {
      return;
    }
  }

  return new Response('Acceso restringido', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Radiant Size Chart Docs"',
    },
  });
}

export const config = {
  matcher: '/(.*)',
};

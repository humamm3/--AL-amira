module.exports = [
  'strapi::logger',
  'strapi::errors',

  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': [
            "'self'",
            'https:',
            'https://al-amira-1.onrender.com',
            'https://www.alamira-shop.com',
            'https://alamira-shop.com',
          ],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
          ],
        },
      },
    },
  },

  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://www.alamira-shop.com',
        'https://alamira-shop.com',
        'https://al-amira-e880.vercel.app',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },

  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
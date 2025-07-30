export default [
  'strapi::logger',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000'], // frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  },
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

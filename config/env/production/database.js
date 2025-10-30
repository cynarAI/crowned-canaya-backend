// config/env/production/database.js
const parse = require("pg-connection-string").parse;

module.exports = ({ env }) => {
  if (env('DATABASE_URL')) {
    const config = parse(env('DATABASE_URL'));
    
    return {
      connection: {
        client: "postgres",
        connection: {
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: false,
        },
        debug: false,
      },
    };
  }
  
  // Fallback to default config
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  };
};

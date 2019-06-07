import { ApplicationConfig } from '@loopback/core';
import * as config from './config';
import { Lb4AuthorizationApplication } from './application';

const logger = console;

export async function main(options: ApplicationConfig = {}) {
  const app = new Lb4AuthorizationApplication(options);
  await app.boot();
  await app.start();
  const { url } = app.restServer;
  logger.log(`Server is running at ${url}`);
  logger.log(`Try ${url}/ping`);
  return app;
}

export { Lb4AuthorizationApplication };

if (require.main === module) {
  main(config).catch(err => {
    logger.error('Cannot start the application.', err);
    process.exit(1);
  });
}

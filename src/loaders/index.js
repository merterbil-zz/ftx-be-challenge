import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';

export default async ({ app }) => {
  await dependencyInjectorLoader();
  Logger.info('Dependency Injector loaded');

  await expressLoader({ app });
  Logger.info('Express loaded');
};

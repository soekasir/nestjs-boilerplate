export const isDevelopment = () =>
  process.env.DEVELOPMENT_MODE === 'true' ? true : false;

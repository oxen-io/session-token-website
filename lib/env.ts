/* eslint-disable no-console */
enum Environment {
  Development = 'development',
  Dev = 'dev',
  Production = 'production',
  Prod = 'prod',
  Staging = 'staging',
  Stg = 'stg',
  Testing = 'testing',
  Test = 'test',
}

export const isNotProduction = () => {
  return (
    !process.env.NEXT_PUBLIC_SITE_ENV ||
    [
      Environment.Development,
      Environment.Dev,
      Environment.Staging,
      Environment.Stg,
      Environment.Testing,
      Environment.Test,
    ].includes(process.env.NEXT_PUBLIC_SITE_ENV as Environment)
  );
};

export const isProduction = () => {
  return !isNotProduction();
};

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
    !process.env.NODE_ENV ||
    [
      Environment.Development,
      Environment.Dev,
      Environment.Staging,
      Environment.Stg,
      Environment.Testing,
      Environment.Test,
    ].includes(process.env.NODE_ENV as Environment)
  );
};

export const isProduction = () => {
  return !isNotProduction();
};

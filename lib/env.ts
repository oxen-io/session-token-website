export enum Environment {
  PRD = 'prd',
  STG = 'stg',
  QA = 'qa',
  DEV = 'dev',
}

const environments = [Environment.PRD, Environment.STG, Environment.QA, Environment.DEV];

export const getEnvironment = (): Environment => {
  const environment = process.env.NEXT_PUBLIC_ENV_FLAG;
  if (!environment || !environments.includes(environment as Environment)) {
    // eslint-disable-next-line no-console
    console.warn(`Invalid environment flag (NEXT_PUBLIC_ENV_FLAG): ${environment}`);
    return Environment.DEV;
  }
  return environment as Environment;
};

export const isProduction = (): boolean => getEnvironment() === Environment.PRD;

export const isEnv = (env: Environment): boolean => getEnvironment() === env;

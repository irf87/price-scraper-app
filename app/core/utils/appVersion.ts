import packageJson from '../../../package.json';

export const getAppVersion = (): string => {
  return packageJson.version;
};

export const getFullAppVersion = (): string => {
  const version = getAppVersion();
  return `Version ${version}`;
};

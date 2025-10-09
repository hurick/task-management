export const buildRoutePath = (path: string) => {
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  const pathWithParams = path.replace(
    routeParametersRegex,
    '(?<$1>[a-zA-Z0-9\-_]+)'
  );

  const pathWithQuery = `${pathWithParams}(?<query>\\?(.*))?`;

  return new RegExp(`^${pathWithQuery}`);
};
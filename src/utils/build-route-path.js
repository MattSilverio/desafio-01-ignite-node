export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z0-9]+)/g;
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    "(?<id>[a-z0-9-_]+)"
  );

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}
export const parseQueryParams = (queryString: string | undefined) => {
  if (!queryString) {
    return {};
  }

  const cleanQuery = queryString.startsWith('?') 
    ? queryString.substring(1) 
    : queryString;

  const params = cleanQuery.split('&');

  const queryParams: Record<string, string> = {};

  params.forEach(param => {
    const [key, value] = param.split('=');
    if (key) {
      queryParams[key] = decodeURIComponent(value || '');
    }
  });

  return queryParams;
};
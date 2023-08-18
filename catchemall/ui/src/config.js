export const apiUrl = () => {
  const url = process.env['REACT_APP_API_URL'];
  if (!url) throw new Error("not api url found in env");
  return url;
};
export const apiUrl = () => {
    const url = import.meta.env['VITE_API_URL'];
    if (!url) throw new Error('not api url found in env');
    return url;
};

export function moveToTop(arr, predicate) {
    if (!Array.isArray(arr) || typeof predicate !== 'function') throw new Error('incorrent inputs');
    const idx = arr.findIndex(predicate);
    const el = arr[idx];
    if (el) {
        arr.splice(idx, 1);
        arr.unshift(el);
    }
    return arr;
}

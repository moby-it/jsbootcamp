/**
 *
 * @param {import("express").Response} res
 * @param {any} err
 * @param {number} status
 * @returns
 */
export function logAndReturn(res, err, status = 500) {
    console.error(err);
    return res.status(status).send(status || 500);
}

export const api = {
    get: async (url: string) => fetch(url).then((res) => res.json()),
}

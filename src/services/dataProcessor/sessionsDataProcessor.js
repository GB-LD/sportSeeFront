export function getSessionsData(fetchData) {
    if (!fetchData || !fetchData.data.sessions) return null;
    return fetchData.data.sessions;
}

export function getMaxKilogram(fetchData) {
    if (!fetchData || !fetchData.data.sessions) return null;
    const kilograms = fetchData.data.sessions.map(session => session.kilogram);
    return Math.max(...kilograms);
}

export function getMinKilogram(fetchData) {
    if (!fetchData || !fetchData.data.sessions) return null;
    const kilograms = fetchData.data.sessions.map(session => session.kilogram);
    return Math.min(...kilograms);
}

export function getMidKilogram(fetchData) {
    if (!fetchData || !fetchData.data.sessions) return null;
    const maxKg = getMaxKilogram(fetchData);
    const minKg = getMinKilogram(fetchData);
    return ((minKg) + (maxKg)) / 2;
}

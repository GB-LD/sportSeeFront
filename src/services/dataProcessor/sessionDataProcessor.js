export const getSessionData = (fetchingData) => {
    if (!fetchingData || !fetchingData.data.sessions) return null;
    return fetchingData.data.sessions || '';
};
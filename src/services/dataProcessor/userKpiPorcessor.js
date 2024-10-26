export const processUserKpi = (fetchingData) => {
    if (!fetchingData || !fetchingData.data.keyData) return null;
    return Object.entries(fetchingData.data.keyData);
};
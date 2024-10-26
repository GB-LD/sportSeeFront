export const processUserFirstName = (fetchingData) => {
    if (!fetchingData || !fetchingData.data.userInfos) return null;
    return fetchingData.data.userInfos.firstName || '';
};
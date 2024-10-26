export const processUserScore = (fetchingData) => {
    if (!fetchingData.data) return 0;
    if (fetchingData.data.todayScore) return fetchingData.data.todayScore;
    if (fetchingData.data.score) return fetchingData.data.score;
};
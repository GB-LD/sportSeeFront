const translatedLabel = (value) => {
    switch (value) {
        case 'energy':
            return 'Énergie';
        case 'strength':
            return 'Force';
        case 'speed':
            return 'Vitesse';
        case 'intensity':
            return 'Intensité';
        case 'cardio':
            return 'Cardio';
        case 'endurance':
            return 'Endurance'
        default:
            return value;
    }
};

export function getPerformanceData(fetchData) {
    if (!fetchData || !fetchData.data.data || !fetchData.data.kind) return null;
        const transformedData = fetchData.data.data.reverse().map(item => ({
        performance: translatedLabel(fetchData.data.kind[item.kind]),
        value: item.value,
        }));
    return transformedData;
}
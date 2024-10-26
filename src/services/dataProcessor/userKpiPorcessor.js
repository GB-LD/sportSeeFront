import calorieIcon from "../../assets/icons/calories-icon.svg";
import proteinIcon from '../../assets/icons/protein-icon.svg';
import carbsIcon from '../../assets/icons/carbs-icon.svg';
import fatIcons from '../../assets/icons/fat-icon.svg';

export const processUserKpi = (fetchingData) => {
    if (!fetchingData || !fetchingData.data.keyData) return null;

    const kpiData = fetchingData.data.keyData;

    const formatData = (type, value) => {
        let typeFormatted;
        let valueUnit;
        let iconPath;

        switch (type) {
            case 'calorieCount':
                typeFormatted = 'Calorie';
                valueUnit = 'kCal';
                iconPath = calorieIcon;
                break;
            case 'proteinCount':
                typeFormatted = 'Protéine';
                valueUnit = 'g';
                iconPath = proteinIcon;
                break;
            case 'carbohydrateCount':
                typeFormatted = 'Glucides';
                valueUnit = 'g';
                iconPath = carbsIcon;
                break;
            case 'lipidCount':
                typeFormatted = 'Lipides';
                valueUnit = 'g';
                iconPath = fatIcons;
                break;
            default:
                typeFormatted = 'N/A';
                valueUnit = 'g';
                iconPath = '';
        }

        return { typeFormatted, valueUnit, iconPath, value };
    };

    return Object.entries(kpiData).map(([type, value]) => formatData(type, value));
};

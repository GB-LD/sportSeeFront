import calorieIcon from "../assets/icons/calories-icon.svg";
import proteinIcon from '../assets/icons/protein-icon.svg';
import carbsIcon from '../assets/icons/carbs-icon.svg';
import fatIcons from '../assets/icons/fat-icon.svg';

const KpiCard = (props) => {

    const {type, value} = props;
    let typeFormated;
    let valueUnit;
    let iconPath;

    function formatedData() {
        switch (type) {
            case 'calorieCount':
                typeFormated = 'Calorie';
                valueUnit = 'kCal';
                iconPath = calorieIcon;
                break;
            case 'proteinCount':
                typeFormated = 'Protéine';
                valueUnit = 'g';
                iconPath = proteinIcon;
                break;
            case 'carbohydrateCount':
                typeFormated = 'Glucides';
                valueUnit = 'g';
                iconPath = carbsIcon;
                break;
            case 'lipidCount':
                typeFormated = 'Lipides';
                valueUnit = 'g';
                iconPath = fatIcons;
                break;
            default:
                typeFormated = 'N/A';
                valueUnit = 'g';
                iconPath = '';
        }
    }

    formatedData();

  return (
    <div className="flex items-center mb-9 last:mb-0 p-8 bg-gray-50 rounded-md">
        <img src={iconPath} alt="icone représentant" />
        <div className="ml-6">
            <div className="text-xl font-bold mb-0.5">{value && value}{valueUnit && valueUnit}</div>
            <p className="text-gray-400 text-sm">{typeFormated && typeFormated}</p>
        </div>
    </div>
  )
}
export default KpiCard
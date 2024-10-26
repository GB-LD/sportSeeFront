const KpiCard = (props) => {
    const { type, value, iconPath } = props;

    return (
        <div className="flex items-center mb-9 last:mb-0 p-8 bg-gray-50 rounded-md">
            <img src={iconPath} alt="icone représentant" />
            <div className="ml-6">
                <div className="text-xl font-bold mb-0.5">{value}</div>
                <p className="text-gray-400 text-sm">{type}</p>
            </div>
        </div>
    );
}

export default KpiCard;

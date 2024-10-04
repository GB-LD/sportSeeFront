import { useEffect, useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Text } from 'recharts';

const PerformanceChart = (props) => {
    const { apiPath, mockPath, isConnectedToBack, userId } = props;
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const urlBase = isConnectedToBack ? apiPath : mockPath;
        const fetchUrl = isConnectedToBack ? `${urlBase}user/${userId}/performance` : `${urlBase}user/${userId}/performance.json`;

        if (fetchUrl) {
            fetch(fetchUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data?.data?.data && data?.data?.kind) {
                        const transformedData = data.data.data.reverse().map(item => ({
                            performance: data.data.kind[item.kind],
                            value: item.value
                        }));

                        setChartData(transformedData);
                    }
                })
                .catch(error => console.log("Fetch error: ", error));
        }
    }, [apiPath, mockPath, isConnectedToBack, userId]);


    function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {

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

        return (
        <Text
            {...rest}
            verticalAnchor="middle"
            y={y + (y - cy) / 10}
            x={x + (x - cx) / 100}
            fill="#FFFFFF"
            fontSize="0.75rem"
        >
            {translatedLabel(payload.value)}
        </Text>
    )
    }

    return (
        <>
            {chartData ? (
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={chartData}
                  outerRadius={"60%"}
                >
                  <PolarGrid radialLines={false} />
                  <PolarAngleAxis
                    dataKey="performance"
                    stroke="white"
                    dy={4}
                    tickLine={false}
                    tick={(props) => renderPolarAngleAxis(props)}
                  />
                  <Radar
                    dataKey="value"
                    fill={'#FF0101'}
                    fillOpacity={0.7}
                    stroke="transparent"
                  />
                </RadarChart>
              </ResponsiveContainer>

            ) : (
                <p>Chargement des données...</p>
            )}
        </>
    );
}

export default PerformanceChart;

import { useEffect, useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Text } from 'recharts';
import { useParams } from "react-router-dom";
import { fetchData } from "../../services/api/fetchService";
import { getPerformanceData } from "../../services/dataProcessor/performanceDataProcessor";

const PerformanceChart = ({ apiPath, mockPath, isConnectedToBack }) => {
    const userId = useParams().id;
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const urlBase = isConnectedToBack ? apiPath : mockPath;
        const fetchUrl = isConnectedToBack ? `${urlBase}user/${userId}/performance` : `${urlBase}user/${userId}/performance.json`;

        fetchData(fetchUrl)
        .then(responseData => setChartData(getPerformanceData(responseData)))
        .catch(error => {
            console.error(error);
          });
    }, [apiPath, mockPath, isConnectedToBack]);


    function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
        return (
        <Text
            {...rest}
            verticalAnchor="middle"
            y={y + (y - cy) / 10}
            x={x + (x - cx) / 100}
            fill="#FFFFFF"
            fontSize="0.75rem"
        >
            {payload.value}
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

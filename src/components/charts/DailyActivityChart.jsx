import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { fetchData } from "../../services/api/fetchService";
import { getSessionsData, getMinKilogram, getMidKilogram, getMaxKilogram } from "../../services/dataProcessor/sessionsDataProcessor";


const DailyActivityChart = ({apiPath, mockPath, isConnectedToBack}) => {
  const userId = useParams().id;
  const [sessionsData, setSessionsData] = useState(null);
  const [minKilogram, setMinKilogram] = useState(null);
  const [maxKilogram, setMaxKilogram] = useState(null);
  const [midKilogram, setMidKilogram] = useState(null);

  useEffect(() => {
      const urlBase = isConnectedToBack ? apiPath : mockPath;
      const fetchUrl = isConnectedToBack ? `${urlBase}user/${userId}/activity` : `${urlBase}user/${userId}/activity.json`;

      fetchData(fetchUrl)
      .then(responseData => {
        setSessionsData(getSessionsData(responseData));
        setMinKilogram(getMinKilogram(responseData));
        setMaxKilogram(getMaxKilogram(responseData));
        setMidKilogram(getMidKilogram(responseData));
      })
      .catch(error => {
        console.error(error);
      });
  }, [apiPath, mockPath, isConnectedToBack]);

    const kilogramDomain = minKilogram !== null && maxKilogram !== null ? [minKilogram - 1, maxKilogram] : ['auto', 'auto'];
    const ticks = minKilogram !== null && maxKilogram !== null ? [minKilogram - 1, midKilogram - 0.5 , maxKilogram] : [];

    const generateHorizontalCoordinates = ({ height }) => {
        if (minKilogram !== null && maxKilogram !== null) {
          const range = 3;
          const getMaxCoordinate = (height / range) * 2 - 35;
          const getMidCoordinate = (height / range) - 35;
          return [getMaxCoordinate, getMidCoordinate];
        }

        return [];
      };

    const renderColorfulLegendText = (value) => {
    return <span className="text-gray-500 font-semibold" >{value}</span>;
    };

    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload) {
        return (
          <div style={{ backgroundColor: '#E60000', padding: '5px' }}>
            <p style={{ fontSize: '8px', color: 'white', marginBottom: '5px' }}>{`${payload[0].payload.kilogram}kg`}</p>
            <p style={{ fontSize: '8px', color: 'white' }}>{`${payload[0].payload.calories}Kcal`}</p>
          </div>
        );
      }
      return null;
    };

  return (
    <ResponsiveContainer width="100%" height="100%">
    <h4 className="absolute text-gray-900 font-semibold">Activité quotidienne</h4>
    <BarChart
    data={sessionsData}
    barGap={8}
    >
        <YAxis yAxisId="calories" orientation="left" hide={true} />
        <YAxis stroke="#9B9EAC" yAxisId="kilogram" orientation="right" hide={false} axisLine={false} tickMargin={20} tickLine={false} ticks={ticks} domain={kilogramDomain} />
        <XAxis axisLine={{ stroke: '#DEDEDE' }}  dataKey="day" tickLine={false} tickFormatter={(value, index) => index + 1} tickMargin={15} stroke="#9B9EAC" />
        <CartesianGrid horizontalCoordinatesGenerator={generateHorizontalCoordinates} strokeDasharray="3 3"  horizontal={true} vertical={false} />
        <Legend height={47} verticalAlign="top" align="right" iconType="circle" iconSize="10" formatter={renderColorfulLegendText} />
        <Bar
            yAxisId="kilogram"
            dataKey="kilogram"
            fill="#282D30"
            radius={[10, 10, 0, 0]}
            name="Poids (kg)"
            barSize={7}
        />
        <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            radius={[10, 10, 0, 0]}
            name="Calories brûlées (kCal)"
            barSize={7}
        />
        <Tooltip content={CustomTooltip} cursor={{ stroke: 'red', strokeWidth: 0, fill: 'rgba(107, 114, 128, 0.2)' }} />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default DailyActivityChart
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from "recharts";
import { useEffect, useState } from "react"

const DailyActivityChart = (props) => {
    const { apiPath, mockPath, isConnectedToBack, userId} = props;

    const [sessionsData, setSessionsData] = useState(null);
    const [minKilogram, setMinKilogram] = useState(null);
    const [maxKilogram, setMaxKilogram] = useState(null);
    const [midKilogram, setMidKilogram] = useState(null);

    useEffect(() => {
        const urlBase = isConnectedToBack ? apiPath : mockPath;
        const fetchUrl = isConnectedToBack ? `${urlBase}user/${userId}/activity` : `${urlBase}user/${userId}/activity.json`;

        if (fetchUrl) {
            fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data?.data?.sessions) {
                    setSessionsData(data?.data?.sessions);

                    const kilograms = data.data.sessions.map(session => session.kilogram);
                    const maxKg = Math.max(...kilograms);
                    const minKg = Math.min(...kilograms);
                    let midKg = (minKg + maxKg) / 2;

                    setMaxKilogram(maxKg);
                    setMinKilogram(minKg);
                    setMidKilogram(midKg);
                    setHorizontalPoints([minKg, midKg, maxKg]);
                }
            })
            .catch(error => console.log("Fetch error: ", error));
        }

    }, [apiPath, mockPath, isConnectedToBack, userId]);

    const kilogramDomain = minKilogram !== null && maxKilogram !== null ? [minKilogram - 1, maxKilogram + 2] : ['auto', 'auto'];
    const ticks = minKilogram !== null && maxKilogram !== null ? [minKilogram - 1, midKilogram , maxKilogram + 1] : [];
    const generateHorizontalCoordinates = ({ height }) => {
        if (minKilogram !== null && maxKilogram !== null) {
          const range = (maxKilogram + 1) - (minKilogram - 1);
          const getYCoordinate = (kgValue) => height - ((kgValue - (minKilogram - 1)) / range) * (height - 47);
          return [getYCoordinate(maxKilogram), getYCoordinate(midKilogram)];
        }

        return [];
      };
    const renderColorfulLegendText = (value) => {
    return <span className="text-gray-500 font-semibold" >{value}</span>;
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
        <Tooltip cursor={{ stroke: 'red', strokeWidth: 0, fill: 'rgba(107, 114, 128, 0.2)' }} />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default DailyActivityChart
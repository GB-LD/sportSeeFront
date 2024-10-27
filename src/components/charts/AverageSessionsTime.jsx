import {XAxis, YAxis, Rectangle, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from '../../services/api/fetchService';
import { getSessionData } from '../../services/dataProcessor/sessionDataProcessor';

const AverageSessionsTime = ({ apiPath, mockPath, isConnectedToBack }) => {
  const userId = useParams().id;
  const [sessionsData, setSessionsData] = useState(null);

  useEffect(() => {
    const urlBase = isConnectedToBack ? apiPath : mockPath;
    const fetchUrl = isConnectedToBack ? `${urlBase}user/${userId}/average-sessions` : `${urlBase}user/${userId}/average-sessions.json`;

    fetchData(fetchUrl)
    .then(responseData => {
      setSessionsData(getSessionData(responseData));
    });
}, [apiPath, mockPath, isConnectedToBack]);


const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'white', padding: '5px' }}>
        <p style={{ fontSize: '8px', color: 'black' }}>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const CustomCursor = ({ points, width, height }) => {
  const { x } = points[0];
  return (
    <Rectangle
      fill="rgba(0, 0, 0, 0.2)"
      x={x}
      y={0}
      width={width}
      height={height}
    />
  );
};

const formatLabel = (value) => {
  if (value === 1) return 'L'
  if (value === 2) return 'M'
  if (value === 3) return 'M'
  if (value === 4) return 'J'
  if (value === 5) return 'V'
  if (value === 6) return 'S'
  if (value === 7) return 'D'
  return value
}

  return (
    <div className='h-full w-full relative rounded bg-[#FF0000]'>
      <h4 className='absolute top-7 left-7 w-3/3 text-white'>Durée moyenne des <br />sessions</h4>
      <ResponsiveContainer  width="100%" height="100%">
        <LineChart data={sessionsData}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#FFF', fontSize: '0.75rem'}} tickFormatter={formatLabel} tickMargin={0} padding={{ left: 20, right: 20 }}/>
          <Tooltip content={CustomTooltip} cursor={<CustomCursor width={500} height={500} />} />
          <YAxis hide domain={['dataMin-20', 'dataMax+50']} />
          <Line type="natural" dataKey="sessionLength" stroke="url(#colorUv)" activeDot={{ stroke: '#FFF', strokeWidth: 4, r: 2, }} dot={false} />
          <defs>
            <linearGradient
            id="colorUv"
            x1="0%"
            y1="0"
            x2="100%"
            y2="0"
            >
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="20%" stopColor="rgba(255, 255, 255, 0.5)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="60%" stopColor="rgba(255, 255, 255, 0.9)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSessionsTime;
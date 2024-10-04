import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const ScoreChart = (props) => {
  const score = props.todayScore ? props.todayScore : 0;
  const dataArray = [{ name: 'score', value: score }];

  return (
    <div className='relative w-full h-full'>
      <h3 className="absolute top-6 left-6 text-gray-800 text-sm font-medium">Score</h3>
      <ResponsiveContainer width="100%" height="100%" >
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={dataArray}
          startAngle={90}
          endAngle={450}
        >
          <RadialBar
            data={[{ value: 1 }]}
            dataKey="value"
            barSize={170}
            fill="#FFF"
            isAnimationActive={false}
          />
          <RadialBar
            dataKey="value"
            barSize={10}
            cornerRadius={100}
            fill="#FF0000"
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[#9b9eac] font-medium leading-7">
        <p className="text-[#282d30] text-xl font-bold">
          {score * 100} %
        </p>
        <p>de votre</p>
        <p>objectif</p>
      </div>

    </div>
  );
};

export default ScoreChart;

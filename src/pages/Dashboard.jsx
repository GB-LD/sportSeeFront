import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import KpiCard from "../components/KpiCard";
import DailyActivityChart from "../components/charts/DailyActivityChart";
import AverageSessionsTime from "../components/charts/AverageSessionsTime";
import PerformanceChart from "../components/charts/PerformanceChart";
import ScoreChart from "../components/charts/ScoreChart";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const userId = useParams().id;
  const { apiPath, mockPath, isConnectedToBack} = props;
  const [user, setUser] = useState(null);
  const [kpiData, setKpiData] = useState(null);
  const [todayScore, setTodayScore] = useState(0)

  useEffect(() => {
    const urlBase = isConnectedToBack ? apiPath : mockPath;
    const fetchUrl = isConnectedToBack ? `${urlBase}user/${userId}` : `${urlBase}user/${userId}.json`;

    if (fetchUrl) {
      fetch(fetchUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json()
      })
      .then(data => {
        if (data) {
          setUser(data);
          if (data.data?.keyData) {
            setKpiData(data.data?.keyData);
          }
          if (data.data?.todayScore) {
            setTodayScore(data.data?.todayScore);
          }
        }
      })
      .catch(error => {
        console.log("Fetch error: ", error);
        navigate("/404");
      });
    }

  }, [apiPath, mockPath, isConnectedToBack, userId]);

  if(!user) {
    return <p>Chargement...</p>
  }

  const kpiArray = kpiData ? Object.entries(kpiData) : null;

  return (
    <div className="w-full py-16 px-12 2xl:px-24">
      <div className="mb-20">
        <h2 className="mb-10 text-5xl font-semibold">Bonjour <strong className="text-red-500 font-semibold">{user?.data?.userInfos?.firstName}</strong></h2>
        <p className="text-lg">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className="flex gap-8 flex-col xl:flex-row">
        <div className="flex flex-wrap flex-1 gap-8">
          <div className="rounded bg-gray-50 h-80 px-8 py-6 w-full">
            <DailyActivityChart
            apiPath={apiPath}
            mockPath={mockPath}
            isConnectedToBack={isConnectedToBack}
            userId={userId}
            />
          </div>
          <div className="w-full h-64 flex gap-8">
            <div className="rounded flex-1">
              <AverageSessionsTime
                apiPath={apiPath}
                mockPath={mockPath}
                isConnectedToBack={isConnectedToBack}
                userId={userId}
              />
            </div>
            <div className="flex-1 rounded">
              <div className="rounded w-full h-full bg-[#282D30] p-4">
                <PerformanceChart
                  apiPath={apiPath}
                  mockPath={mockPath}
                  isConnectedToBack={isConnectedToBack}
                  userId={userId}
                />
              </div>
            </div>
            <div className="flex-1 rounded bg-gray-50">
              <ScoreChart
                todayScore = {todayScore}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row min-w-fit justify-between flex-wrap xl:flex-col">
          {kpiArray && kpiArray.map(data => <KpiCard key={data[0]} type={data[0]} value={data[1]}/>) }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
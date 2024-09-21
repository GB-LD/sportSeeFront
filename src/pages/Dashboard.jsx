import { useState, useEffect } from "react"
import KpiCard from "../components/KpiCard";

const Dashboard = (props) => {
  const { apiPath, mockPath, isConnectedToBack, userId} = props;
  const [user, setUser] = useState(null);
  const [kpiData, setKpiData] = useState(null);

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
        }
      })
      .catch(error => console.log("Fetch error: ", error));
    }

  }, [apiPath, mockPath, isConnectedToBack, userId]);

  if(!user) {
    return <p>Chargement...</p>
  }

  const kpiArray = kpiData ? Object.entries(kpiData) : [];

  return (
    <div className="w-full py-16 px-24">
      <div className="mb-20">
        <h2 className="mb-10 text-5xl font-semibold">Bonjour <strong className="text-red-500 font-semibold">{user?.data?.userInfos?.firstName}</strong></h2>
        <p className="text-lg">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className="outline-dashed outline-1 outline-green-500 flex gap-8 w-full">
        <div className="flex-1">
          <p>dashboard chart</p>
        </div>
        <div className="flex flex-col w-max">
          {kpiArray && kpiArray.map(data => <KpiCard key={data[0]} type={data[0]} value={data[1]}/>) }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
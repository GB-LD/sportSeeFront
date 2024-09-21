import { useState, useEffect } from "react"

const Dashboard = (props) => {
  const { apiPath, mockPath, isConnectedToBack, userId} = props;
  const [user, setUser] = useState(null);

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
        console.log(data);
        if (data) {
          setUser(data);
        }
      })
      .catch(error => console.log("Fetch error: ", error));
    }

  }, [apiPath, mockPath, isConnectedToBack, userId]);

  if(!user) {
    return <p>Chargement...</p>
  }

  return (
    <div className="w-full py-16 px-24">
      <h2 className="mb-10 text-5xl font-semibold">Bonjour <strong className="text-red-500 font-semibold">{user?.data?.userInfos?.firstName}</strong></h2>
      <p className="text-lg">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  )
}

export default Dashboard
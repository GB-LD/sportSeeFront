import { useState, useEffect } from "react"
const USER_ID = 1;

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("../../public/mocks/users.json")
    .then(response => response.json())
    .then(data => {
      const users = data.data;
      const foundUser = users.find((u) => u.id === USER_ID);
      setUser(foundUser);
    })
    .catch((error) => {
      console.error("Erreur lors du fetch:", error);
    });
  }, []);

  if (!user) {
    return (
      <div className="w-full py-16 px-24 text-center">
        <p>Chargement...</p>
      </div>
    );
  }

  const { firstName, ...rest } = user.userInfos;

  return (
    <div className="w-full py-16 px-24">
      <h2 className="mb-10 text-5xl font-semibold">Bonjour <strong className="text-red-500 font-semibold">{firstName}</strong></h2>
      <p className="text-lg">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  )
}

export default Dashboard
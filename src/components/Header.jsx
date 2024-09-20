import logo from '../assets/logo-sportsee.png'

const Header = () => {
  return (
    <div className='bg-black flex items-center py-4'>
        <img
        className='w-44 ml-7'
        src={logo}
        alt="logo de l'application sportsee"
        />
        <nav className='flex-1 flex justify-around text-2xl text-white font-medium'>
            <a href="#">Accueil</a>
            <a href="#">Profil</a>
            <a href="#">Réglage</a>
            <a href="#">Communauté</a>
        </nav>
    </div>
  )
}
export default Header
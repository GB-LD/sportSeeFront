import zenIcon from "../assets/icons/zen-icon.svg";
import gymIcon from "../assets/icons/gym-icon.svg";
import swimIcon from "../assets/icons/swim-icon.svg";
import bikeIcon from "../assets/icons/bike-icon.svg";

const LeftPannel = () => {
  return (
    <div className="bg-black px-7 pb-14 min-w-fit relative flex flex-col justify-center">
        <ul className="flex flex-col gap-2.5">
            <li><button><img className="w-16 h-16" src={zenIcon} alt="icone zen" /></button></li>
            <li><button><img className="w-16 h-16" src={swimIcon} alt="icone nage" /></button></li>
            <li><button><img className="w-16 h-16" src={bikeIcon} alt="icone vélo" /></button></li>
            <li><button><img className="w-16 h-16" src={gymIcon} alt="icone musculation" /></button></li>
        </ul>
        <span className="text-white text-sm whitespace-nowrap origin-right -rotate-90 absolute bottom-48 right-1/2">Copiryght, SportSee 2020</span>
    </div>
  )
}
export default LeftPannel

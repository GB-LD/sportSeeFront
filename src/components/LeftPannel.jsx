import zenIcon from "../assets/icons/zen-icon.svg";
import gymIcon from "../assets/icons/gym-icon.svg";
import swimIcon from "../assets/icons/swim-icon.svg";
import bikeIcon from "../assets/icons/bike-icon.svg";

const LeftPannel = () => {
  return (
    <div className="bg-black px-7 pb-14 w-max relative flex flex-col justify-center">
        <ul className="flex flex-col gap-2.5">
            <li><button><img src={zenIcon} alt="icone zen" /></button></li>
            <li><button><img src={swimIcon} alt="icone nage" /></button></li>
            <li><button><img src={bikeIcon} alt="icone vélo" /></button></li>
            <li><button><img src={gymIcon} alt="icone musculation" /></button></li>
        </ul>
        <span className="text-white text-sm whitespace-nowrap origin-right -rotate-90 absolute bottom-48 right-1/2">Copiryght, SportSee 2020</span>
    </div>
  )
}
export default LeftPannel

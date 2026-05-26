import { ArrowRight } from "lucide-react";
import plant2 from "../../assets/plant-2.png"

const HeroBanner = () => {
    return (
        <div className="md:px-10 pt-10">
            <div className=" w-full mx-auto flex flex-col items-center">
                <h2 className="text-9xl text-center font-bold text-[#2FA084]">Flora Tracker</h2>
                <div className="md:w-1/3 relative bottom-24"><img src={plant2} alt="tree 1" /></div>
                <button className="btn btn-primary">Get started <ArrowRight/></button>
            </div>
        </div>
    );
};

export default HeroBanner;
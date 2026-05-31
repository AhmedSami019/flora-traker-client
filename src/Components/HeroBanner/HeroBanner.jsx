import { ArrowRight } from "lucide-react";
import plant1 from "../../assets/plant-1.png";
import plant2 from "../../assets/plant-2.png";
import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <div className="px-3 md:px-10 ">
      <div className=" w-full mx-auto flex flex-col items-center mb-10 bg-white rounded-2xl p-10">
        <h2 className="text-9xl text-center font-bold text-[#2FA084]">
          Flora Tracker
        </h2>
        <div className="md:w-1/3 relative bottom-24">
          <img src={plant2} alt="tree 1" />
        </div>
        <Link to={`/dashboard`} className="btn btn-primary">
          Get started <ArrowRight />
        </Link>
      </div>
      <div className=" md:flex items-center gap-10">
        <div className="md:w-1/2 bg-white p-10 rounded-2xl">
          <h3 className="text-3xl font-semibold mb-5">work for_</h3>
          <p>
            A plant care tracker app acts as a digital gardening assistant that
            simplifies plant management by allowing users to log their plants,
            automatically generating smart care schedules for watering, misting,
            and fertilizing based on botanical data and local weather
            conditions. Utilizing smartphone features, the app uses AI image
            recognition to instantly identify unknown species, reads ambient
            light sensors to measure room brightness, and diagnoses plant
            diseases through leaf photos to offer targeted treatment plans.
            Behind the scenes, it manages a localized database tracking
            individual plant histories and photo growth journals, continuously
            calculating and sending out push notifications to ensure users check
            off care tasks at the exact right moment for optimum plant health.
          </p>
        </div>
        <div className="md:w-1/2 ">
          <img src={plant1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

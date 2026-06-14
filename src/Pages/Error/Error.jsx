import LottieModule from "lottie-react";
import error404 from "../../assets/Animations/error404.json";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
const Lottie = LottieModule.default || LottieModule;

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-30">
        <Link to={`/`} className="btn btn-primary "><ArrowLeft/> Go home</Link>
      <div className="w-1/2 my-auto">
        <Lottie animationData={error404} loop />
      </div>
    </div>
  );
};

export default Error;

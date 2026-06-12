import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import store from "../../assets/Animations/store.json";
import LottieModule from "lottie-react";
const Lottie = LottieModule.default || LottieModule;
const Shop = () => {

  console.log(Lottie);
  return (
    <div className="space-y-10 flex flex-col items-center my-10 h-screen">
      <h2 className="text-4xl text-center font-bold">Build in process</h2>
      <div className="">
      <Lottie
          animationData={store}
          loop={true}
        />
      </div>
      <div>
        <Link to={"/"} className="btn btn-primary">
          <ArrowLeft/>Go home
        </Link>
      </div>
    </div>
  );
};

export default Shop;

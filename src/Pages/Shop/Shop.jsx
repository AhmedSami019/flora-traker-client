import { Link } from "react-router";
import buildImage from "../../assets/buildOnProcess.svg";
import { ArrowLeft } from "lucide-react";
const Shop = () => {
  return (
    <div className="space-y-10 flex flex-col items-center my-10 h-screen">
      <h2 className="text-4xl text-center font-bold">Build in process</h2>
      <div className="">
        <img
          className="mx-auto"
          src={buildImage}
          alt="build on process image"
        />
      </div>
      <div>
        <Link to={"/"} className="btn btn-primary">
          <ArrowLeft></ArrowLeft>Go home
        </Link>
      </div>
    </div>
  );
};

export default Shop;

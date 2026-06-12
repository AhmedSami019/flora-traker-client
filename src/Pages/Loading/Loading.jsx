import LottieModule from "lottie-react";
import loading from "../../assets/Animations/loading.json"
const Lottie = LottieModule.default || LottieModule;

const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-30">
      <Lottie animationData={loading} loop={true}/>
    </div>
  );
};

export default Loading;

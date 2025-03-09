import Lottie from "lottie-react";

interface LottieFilesProps {
  animation: object;
  className?: string;
}

const LottieFiles: React.FC<LottieFilesProps> = ({ animation, className }) => {
  return <Lottie animationData={animation} loop={true} className={className} />;
};

export default LottieFiles;

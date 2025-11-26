import React from "react";
import Lottie from "lottie-react";
import loadingAnim from "../assets/loading.json"; // PLACE YOUR LOTTIE HERE

export default function LottieLoader() {
  return (
    <div className="flex justify-center mt-6">
      <Lottie animationData={loadingAnim} style={{ height: 120 }} />
    </div>
  );
}

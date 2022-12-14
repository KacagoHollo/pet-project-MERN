import React from "react";
import LoadingSpin from "react-loading-spin";

const LoadingMask = () => {
  return (
    <LoadingSpin
      duration="2s"
      width="15px"
      timingFunction="ease-in-out"
      direction="alternate"
      size="200px"
      primaryColor="green"
      secondaryColor="#111"
      numberOfRotationsInAnimation={2}
    />
  );
};

export default LoadingMask;
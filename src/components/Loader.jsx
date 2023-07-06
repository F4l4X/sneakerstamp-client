import React from "react";

const Loader = ({ color = "white" }) => {
  const style = `inline-block h-8 w-8 text-${color}-500 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`;
  return <div className={style} />;
};

export default Loader;

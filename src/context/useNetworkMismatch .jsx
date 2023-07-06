import {
  useNetworkMismatch,
  useSwitchChain,
  ChainId,
} from "@thirdweb-dev/react";

import { FaExclamationTriangle } from "react-icons/fa";

const NetworkChange = () => {
  const isMismatched = useNetworkMismatch();
  const switchchain = useSwitchChain();

  return (
    <div>
      {isMismatched && (
        <button
          className={
            "flex items-center justify-center px-4 py-2 space-x-2 text-white bg-blue-500 rounded-md sm:px-6 sm:py-3"
          }
          onClick={() => switchchain(ChainId.Mumbai)}
        >
          Switch Network
        </button>
      )}
    </div>
  );
};

const WrongNetwork = () => {
  const isMismatched = useNetworkMismatch();

  return (
    <div>
      {isMismatched && (
        <div className="mx-auto flex gap-4 bg-red-500 text-white justify-center items-center rounded-md mb-12 h-10">
          <FaExclamationTriangle size={"30px"} />
          <p>You are not connected to right network </p>
          <FaExclamationTriangle size={"30px"} />
        </div>
      )}
    </div>
  );
};

export { NetworkChange, WrongNetwork };

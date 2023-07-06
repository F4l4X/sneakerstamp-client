import React from "react";
import QRCode from "react-qr-code";

const QrCodeGenerator = (data) => {
  return (
    <div className="bg-white px-4 py-4 rounded-md" id="canvas">
      <QRCode value={JSON.stringify(data)} />
    </div>
  );
};

export default QrCodeGenerator;

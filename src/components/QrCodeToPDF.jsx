import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { FiDownload } from "react-icons/fi";
import QRCode from "qrcode";

const QRCodeToPDF = ({ data, filename }) => {
  const fileName = `${filename}.pdf`;
  const [qrCodeImageBase64, setQrCodeImageBase64] = useState("");
  useEffect(() => {
    QRCode.toDataURL(JSON.stringify(data), (err, url) => {
      setQrCodeImageBase64(url);
    });
  }, []);

  {
    return (
      <div>
        <PDFDownloadLink
          document={<PDFDocument qrCodeImage={qrCodeImageBase64} />}
          fileName={fileName}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Génération du PDF..."
            ) : (
              <div className="flex mt-6 gap-3">
                <FiDownload className="w-6 h-6" />
                <p className="text-lg font-semibold">Download Qr Code</p>
              </div>
            )
          }
        </PDFDownloadLink>
      </div>
    );
  }
};

const PDFDocument = ({ qrCodeImage }) => (
  <Document>
    <Page>
      <View style={styles.container}>
        <Text style={styles.title}>QR Code</Text>
        <Image src={qrCodeImage} style={styles.qrCodeImage} />
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  qrCodeImage: {
    width: 100,
    height: 100,
  },
});

export default QRCodeToPDF;

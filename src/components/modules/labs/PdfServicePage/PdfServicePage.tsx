import React from "react";
import printJS from "print-js";
import axios from "axios";
import { Box } from "@mui/material";

export const PdfServicePage = () => {
  const printPDF = (base64: string) => {
    printJS({ printable: base64, type: "pdf", base64: true });
  };
  // const downloadPDF = (pdf: string) => {
  //   const linkSource = `data:application/pdf;base64,${pdf}`;
  //   const downloadLink = document.createElement("a");
  //   const fileName = "vct_illustration.pdf";
  //
  //   downloadLink.href = linkSource;
  //   downloadLink.download = fileName;
  //   downloadLink.click();
  // };
  const algo = async () => {
    const response = await axios.post(
      "https://awvry2tdw5.execute-api.us-east-1.amazonaws.com/dev/generate-pdf-ticket-parking",
      {
        licencePlate: "CPX010",
        timeStart: "1561399553000",
        type: "Carro",
        createdBy: "Fernando Ramos",
      }
    );
    printPDF(response.data);
  };
  return (
    <Box>
      <button type="button" onClick={algo}>
        PDF
      </button>
    </Box>
  );
};

import React from "react";
import { Drawer } from "@components/index";
import { IconList } from "@components/Drawer";
import { Paths, DRAWER, PERMISSION_MODULES } from "@utils/index";
import { useNavigate } from "react-router-dom";
import { useCheckPermissions } from "@hooks/index";
import { Box } from "@material-ui/core";
import printJS from "print-js";
import axios from "axios";

const DashboardRoot: React.FunctionComponent = () => {
  const navigate = useNavigate();

  // const downloadPDF = (pdf: string) => {
  //   const linkSource = `data:application/pdf;base64,${pdf}`;
  //   const downloadLink = document.createElement("a");
  //   const fileName = "vct_illustration.pdf";
  //
  //   downloadLink.href = linkSource;
  //   downloadLink.download = fileName;
  //   downloadLink.click();
  // };

  const printPDF = (base64: string) => {
    printJS({ printable: base64, type: "pdf", base64: true });
  };
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
  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MAIN_DASHBOARD_MENU_ADMIN,
      icon: "cogs",
      onClick: () => navigate(Paths.moduleAdmin),
      show: useCheckPermissions([PERMISSION_MODULES.ADMIN], "all"),
    },
    {
      text: DRAWER.MODULE_RECEPTION_TITLE,
      icon: "door-open",
      onClick: () => navigate(Paths.moduleReception),
      show: useCheckPermissions([PERMISSION_MODULES.RECEPTION], "all"),
    },
  ];
  return (
    <Drawer
      canShowContent
      title={DRAWER.MAIN_DASHBOARD_TITLE}
      items={itemsMenu}
      withMainIcon={false}
    >
      <Box>Bienvenidos</Box>
      <button type="button" onClick={algo}>
        PDF
      </button>
    </Drawer>
  );
};

export default DashboardRoot;

import React from "react";
import { Drawer, IconList } from "@components/shared";
import { ThermalPrinterPage, PdfServicePage } from "@components/modules/labs";
import { Paths } from "@utils/index";
import { Route, Routes, useNavigate } from "react-router-dom";

const {
  moduleLabs: { thermalPrinter, pdfService },
} = Paths;

const Labs: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const itemsMenu: IconList[] = [
    {
      text: "Impresora Post",
      icon: "flask-vial",
      onClick: () => navigate(thermalPrinter),
      show: true,
    },
    {
      text: "Servicio de PDF",
      icon: "flask-vial",
      onClick: () => navigate(pdfService),
      show: true,
    },
  ];
  return (
    <Drawer title="Pruebas" items={itemsMenu} canShowContent={true}>
      <Routes>
        <Route path={thermalPrinter} element={<ThermalPrinterPage />} />
        <Route path={pdfService} element={<PdfServicePage />} />
      </Routes>
    </Drawer>
  );
};

export default Labs;

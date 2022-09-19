import React, { useState } from "react";
import { Drawer, QueryErrorBoundary } from "@components/shared";
import { IconList } from "@components/shared/Drawer";
import { Paths, DRAWER, PERMISSION_MODULES } from "@utils/index";
import { useNavigate } from "react-router-dom";
import { useCheckPermissions } from "@hooks/index";
import { Box, Grid, Paper, Typography } from "@mui/material";
import printJS from "print-js";
import axios from "axios";
import { usePointOfSaleAccessQuery } from "@api/pointOfSale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import { OpenPointOfSaleModal } from "@components/modules/Root/OpenPointOfSaleModal";
import { PointOfSale } from "@dto/pointOfSale";

const Item = styled(Paper)(() => ({
  textAlign: "center",
  paddingTop: "20px",
  paddingBottom: "20px",
}));

const Root: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [openPointOfSaleDialog, setOpenPointOfSaleDialog] =
    useState<PointOfSale | null>(null);

  // const downloadPDF = (pdf: string) => {
  //   const linkSource = `data:application/pdf;base64,${pdf}`;
  //   const downloadLink = document.createElement("a");
  //   const fileName = "vct_illustration.pdf";
  //
  //   downloadLink.href = linkSource;
  //   downloadLink.download = fileName;
  //   downloadLink.click();
  // };

  const { moduleAdmin, moduleReception } = Paths;

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
      onClick: () => navigate(moduleAdmin.main),
      show: useCheckPermissions([PERMISSION_MODULES.ADMIN], "all"),
    },
    {
      text: DRAWER.MODULE_RECEPTION_TITLE,
      icon: "door-open",
      onClick: () => navigate(moduleReception.main),
      show: useCheckPermissions([PERMISSION_MODULES.RECEPTION], "all"),
    },
  ];
  const pointOfSaleAccessQuery = usePointOfSaleAccessQuery();
  const { data: pointOfSaleAccessData, isSuccess } = pointOfSaleAccessQuery;
  return (
    <Drawer
      canShowContent
      title={DRAWER.MAIN_DASHBOARD_TITLE}
      items={itemsMenu}
      withMainIcon={false}
    >
      {openPointOfSaleDialog && (
        <OpenPointOfSaleModal
          open={!!openPointOfSaleDialog}
          instance={openPointOfSaleDialog}
          handleClose={() => {
            setOpenPointOfSaleDialog(null);
          }}
        />
      )}
      <Box>Bienvenidos</Box>
      <button type="button" onClick={algo}>
        PDF
      </button>
      <QueryErrorBoundary queries={[pointOfSaleAccessQuery]}>
        <Grid container spacing={2}>
          {isSuccess &&
            !pointOfSaleAccessData.openWorkShift?.pointOfSale &&
            pointOfSaleAccessData.authorizedPointsOfSale.map((pointOfSale) => (
              <Grid
                item
                key={pointOfSale.id}
                xs={12}
                sm={6}
                md={3}
                lg={2}
                onClick={() => setOpenPointOfSaleDialog(pointOfSale)}
              >
                <Item elevation={3}>
                  <Box>
                    <FontAwesomeIcon
                      icon={["fal", "cash-register"]}
                      size="3x"
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption">
                      {pointOfSale.name}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
            ))}
        </Grid>
      </QueryErrorBoundary>
    </Drawer>
  );
};

export default Root;

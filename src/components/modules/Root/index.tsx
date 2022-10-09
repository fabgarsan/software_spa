import React, { useState } from "react";
import { Drawer, QueryErrorBoundary } from "@components/shared";
import { IconList } from "@components/shared/Drawer";
import { Paths, DRAWER, PERMISSION_MODULES } from "@utils/index";
import { useNavigate } from "react-router-dom";
import { useCheckPermissions } from "@hooks/index";
import { Box, Grid, Paper, Typography } from "@mui/material";
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

  const {
    moduleAdmin,
    moduleReception,
    moduleReports,
    moduleLabs,
    moduleAccounting,
    moduleMyAccount,
  } = Paths;

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
    {
      text: DRAWER.MODULE_REPORTS_TITLE,
      icon: "file-chart-pie",
      onClick: () => navigate(moduleReports.main),
      show: useCheckPermissions([PERMISSION_MODULES.REPORTS], "all"),
    },
    {
      text: DRAWER.MODULE_ACCOUNTING_TITLE,
      icon: "abacus",
      onClick: () => navigate(moduleAccounting.main),
      show: useCheckPermissions([PERMISSION_MODULES.ACCOUNTING], "all"),
    },
    {
      text: DRAWER.MODULE_MY_ACCOUNT_TITLE,
      icon: "id-card",
      onClick: () => navigate(moduleMyAccount.main),
      show: true,
    },
    {
      text: "Pruebas",
      icon: "flask-vial",
      onClick: () => navigate(moduleLabs.main),
      show: useCheckPermissions([PERMISSION_MODULES.LABS], "all"),
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

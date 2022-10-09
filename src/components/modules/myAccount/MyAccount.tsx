import React from "react";
import { Drawer } from "@components/shared";
import { DRAWER } from "@utils/index";
import { Grid } from "@mui/material";
import { ChangePassword } from "@components/modules/myAccount/ChangePassword";

const MyAccount: React.FunctionComponent = () => {
  return (
    <Drawer
      title={DRAWER.MODULE_MY_ACCOUNT_TITLE}
      items={[]}
      canShowContent={true}
    >
      <Grid container>
        <Grid item xs={12} sm={6} md={3} xl={2}>
          <ChangePassword />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default MyAccount;

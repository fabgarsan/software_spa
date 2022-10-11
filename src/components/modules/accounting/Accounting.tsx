import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Drawer } from "@components/shared";
import { IconList } from "@components/shared/Drawer";
import {
  Paths,
  DRAWER,
  PERMISSION_MODULES,
  instancesDescriptor,
  InstancesDescriptorKeys,
} from "@utils/index";
import {
  useCheckGenericUserPermissions,
  useCheckPermissions,
} from "@hooks/index";
import { ElectronicInvoiceDashboard } from "@components/modules/accounting/ElectronicInvoiceDashboard";
import { TaxesDashboard } from "@components/modules/accounting/TaxesDashboard";

const instanceDescriptorUniqueInvoiceNumber =
  instancesDescriptor[InstancesDescriptorKeys.uniqueInvoiceNumber];

const {
  moduleAccounting: { electronicInvoiceNumber, taxes },
} = Paths;

const Accounting: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const itemsMenu: IconList[] = [
    {
      text: DRAWER.MODULE_ACCOUNTING_ELECTRONIC_INVOICE_TITLE,
      icon: "receipt",
      onClick: () => navigate(electronicInvoiceNumber),
      show: useCheckGenericUserPermissions(
        instanceDescriptorUniqueInvoiceNumber.permissions.generic
      ).HAS_ANY,
    },
    {
      text: DRAWER.MODULE_ACCOUNTING_TAXES_TITLE,
      icon: "building-columns",
      onClick: () => navigate(taxes),
      show: useCheckGenericUserPermissions(
        instanceDescriptorUniqueInvoiceNumber.permissions.generic
      ).HAS_ANY,
    },
  ];

  const hasPermission = useCheckPermissions(
    [PERMISSION_MODULES.ACCOUNTING],
    "all"
  );
  return (
    <Drawer
      title={DRAWER.MODULE_ACCOUNTING_TITLE}
      items={itemsMenu}
      canShowContent={hasPermission}
    >
      <Routes>
        <Route
          path={electronicInvoiceNumber}
          element={<ElectronicInvoiceDashboard />}
        />
        <Route path={taxes} element={<TaxesDashboard />} />
      </Routes>
    </Drawer>
  );
};

export default Accounting;

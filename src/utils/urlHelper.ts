const mainPath = {
  admin: "admin/",
  reports: "reportes/",
  reception: "recepcion/",
  pointOfSale: "punto-venta/",
  accounting: "contabilidad/",
  labs: "laboratorio/",
  myAccount: "mi-cuenta/",
};

export const Paths = {
  root: "/",
  moduleAdmin: {
    main: mainPath.admin,
    users: "usuarios/",
    escorts: "acompanantes/",
    employees: "colaboradores/",
    companies: "empresas/",
    room: "habitaciones/",
    parking: "parqueadero/",
    pointOfSale: "puntos-venta/",
    printer: "impresoras/",
  },
  moduleReception: {
    main: mainPath.reception,
    signOut: "sign-out/",
    signIn: "sign-in/",
  },
  modulePointOfSale: {
    main: mainPath.pointOfSale,
    parkingLot: "parqueadero/",
    escortServices: "servicios/",
    moneyOperations: "operaciones-dinero/",
    close: "cerrar/",
  },
  moduleReports: {
    main: mainPath.reports,
    parkingServicesHistory: "parqueadero-historico/",
    signOutInLog: "reporte-entradas-salidas/",
    invoices: "facturas/",
  },
  moduleLabs: {
    main: mainPath.labs,
    thermalPrinter: "probando-impresora-post/",
    pdfService: "probando-servicio-generacion-pdf/",
  },
  moduleAccounting: {
    main: mainPath.accounting,
    electronicInvoiceNumber: "consecutivos-facturacion/",
    taxes: "impuestos/",
  },
  moduleMyAccount: {
    main: mainPath.myAccount,
  },
};

const mainPath = {
  admin: "admin/",
  reception: "recepcion/",
  pointOfSale: "punto-venta/",
};

export const Paths = {
  root: "/",
  moduleAdmin: {
    main: mainPath.admin,
    users: `usuarios/`,
    escorts: `acompanantes/`,
    employees: `colaboradores/`,
    companies: `empresas/`,
    room: `habitaciones/`,
    parking: `parqueadero/`,
    pointOfSale: `puntos-venta/`,
  },
  moduleReception: {
    main: mainPath.reception,
    signOut: `sign-out/`,
    signIn: `sign-in/`,
    signOutInLogBook: `sign-out-in-log-book/`,
  },
  modulePointOfSale: {
    main: mainPath.pointOfSale,
    parkingLot: `parqueadero/`,
    close: `cerrar/`,
  },
};

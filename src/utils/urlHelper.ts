const ROOT_ADMIN = "/admin/";
const ROOT_RECEPTION = "/recepcion/";
export const Paths = {
  moduleRoot: "/",
  moduleReception: ROOT_RECEPTION,
  moduleReceptionSingOut: `${ROOT_RECEPTION}sign-out/`,
  moduleReceptionSingIn: `${ROOT_RECEPTION}sign-in/`,
  moduleReceptionSingOutInLogBook: `${ROOT_RECEPTION}sign-out-in-log-book/`,
  moduleAdmin: ROOT_ADMIN,
  moduleAdminUsers: `${ROOT_ADMIN}usuarios/`,
  moduleAdminEscorts: `${ROOT_ADMIN}acompanantes/`,
  moduleAdminEmployees: `${ROOT_ADMIN}colaboradores/`,
  moduleAdminCompanies: `${ROOT_ADMIN}empresas/`,
};

export default Paths;

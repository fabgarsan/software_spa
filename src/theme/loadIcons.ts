import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faAngleRight,
  faAngleLeft,
  faUsers,
  faCogs,
  faSignOut,
  faHome,
  faUserNurse,
} from "@fortawesome/pro-light-svg-icons";

const loadIcons = (): void => {
  library.add(faBars);
  library.add(faAngleRight);
  library.add(faAngleLeft);
  library.add(faUsers);
  library.add(faCogs);
  library.add(faSignOut);
  library.add(faHome);
  library.add(faUserNurse);
};

export default loadIcons;

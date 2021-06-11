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
  faSpinner,
  faPlus,
  faTrash,
  faEdit,
} from "@fortawesome/pro-light-svg-icons";

const loadIcons = (): void => {
  library.add(faPlus);
  library.add(faBars);
  library.add(faAngleRight);
  library.add(faAngleLeft);
  library.add(faUsers);
  library.add(faCogs);
  library.add(faSignOut);
  library.add(faHome);
  library.add(faUserNurse);
  library.add(faSpinner);
  library.add(faTrash);
  library.add(faEdit);
};

export default loadIcons;

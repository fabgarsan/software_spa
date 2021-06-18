import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faAngleRight,
  faAngleLeft,
  faUsers,
  faCogs,
  faSignOut,
  faSignIn,
  faHome,
  faUserNurse,
  faSpinner,
  faPlus,
  faTrash,
  faEdit,
  faDoorOpen,
  faCheckCircle,
  faTimesCircle,
  faUserHardHat,
  faAddressBook,
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
  library.add(faDoorOpen);
  library.add(faSignIn);
  library.add(faCheckCircle);
  library.add(faTimesCircle);
  library.add(faUserHardHat);
  library.add(faAddressBook);
};

export default loadIcons;

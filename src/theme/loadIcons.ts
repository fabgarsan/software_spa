import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faAngleRight,
  faAngleLeft,
  faAngleDown,
  faUsers,
  faCogs,
  faSignOut,
  faSignIn,
  faHome,
  faUserNurse,
  faGlobeAmericas,
  faSpinner,
  faPlus,
  faTrash,
  faEdit,
  faDoorOpen,
  faCheckCircle,
  faTimesCircle,
  faUserHardHat,
  faAddressBook,
  faScanner,
  faKeyboard,
  faBuilding,
  faEye,
  faBed,
  faCar,
} from "@fortawesome/pro-light-svg-icons";

const loadIcons = (): void => {
  library.add(faPlus);
  library.add(faBars);
  library.add(faAngleRight);
  library.add(faAngleLeft);
  library.add(faAngleDown);
  library.add(faGlobeAmericas);
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
  library.add(faScanner);
  library.add(faKeyboard);
  library.add(faBuilding);
  library.add(faEye);
  library.add(faBed);
  library.add(faCar);
};

export default loadIcons;

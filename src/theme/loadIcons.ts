import {library} from '@fortawesome/fontawesome-svg-core'
import {faCoffee, faBars, faAngleRight, faAngleLeft, faUsers, faAddressBook, faCogs, faSignOut} from "@fortawesome/pro-light-svg-icons"

const loadIcons = () => {
  library.add(faCoffee)
  library.add(faBars)
  library.add(faAngleRight)
  library.add(faAngleLeft)
  library.add(faUsers)
  library.add(faAddressBook)
  library.add(faCogs)
  library.add(faSignOut)
}

export default loadIcons;
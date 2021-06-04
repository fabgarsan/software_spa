import React from "react";
import {Drawer} from "../../components";
import {Paths} from "../../utils/urlHelper";
import {useHistory} from "react-router-dom";

const Root = () => {
  const {push} = useHistory();
  return <Drawer title='Principal' items={[{text: 'Admin', icon: 'cogs', onClick: () => push(Paths.root)}]}>
    <div>This is the root</div>
  </Drawer>
}

export default Root;
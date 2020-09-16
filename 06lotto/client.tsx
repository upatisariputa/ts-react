import * as React from "react";
import * as ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import Lotto from "./lotto";
const Hot = hot(Lotto);

ReactDom.render(<Hot />, document.querySelector("#root"));

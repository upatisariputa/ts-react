import * as React from "react";
import * as ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import RSP from "./RSP";

const Hot = hot(RSP);

ReactDom.render(<Hot />, document.querySelector("#root"));

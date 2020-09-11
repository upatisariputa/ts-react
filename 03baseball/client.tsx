import * as React from "react";
import * as ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import Baseball from "./Baseball";

const Hot = hot(Baseball);

ReactDom.render(<Hot />, document.querySelector("#root"));

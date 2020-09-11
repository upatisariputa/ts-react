import * as React from "react";
import * as ReactDom from "react-dom";
import { hot } from "react-hot-loader/root";

import WordChain from "./WordChain";

const Hot = hot(WordChain);

ReactDom.render(<Hot />, document.querySelector("#root"));

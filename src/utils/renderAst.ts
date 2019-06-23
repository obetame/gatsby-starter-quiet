import React from 'react';
import rehypeReact from "rehype-react";

import Image from '../components/image';
import Gist from '../components/gist';

const renderAst = new rehypeReact({
  createElement: <any>React.createElement,
  components: {
    'image-name': Image,
    'gist': Gist
  },
}).Compiler;

export default renderAst;
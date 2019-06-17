import React from 'react';
import rehypeReact from "rehype-react";

import Image from '../components/image';

const renderAst = new rehypeReact({
  createElement: <any>React.createElement,
  components: {
    'image-name': Image
  },
}).Compiler;

export default renderAst;
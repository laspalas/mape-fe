import React from 'react';

import bn from 'utils/bemnames';

import { Container } from 'reactstrap';

const bem = bn.create('content');

const Content = ({ tag: Tag, className, ...restProps }) => {
  const classes = bem.b(className);

  return <Tag className={classes} style={{ paddingLeft: 0, paddingRight: 0}} {...restProps} />;
};

Content.defaultProps = {
  tag: Container,
};

export default Content;

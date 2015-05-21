import React from 'react';
import { FlexLayout, Content, Header, Footer } from './Layout';

class NotFound extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <FlexLayout>
        <Header title="404 NotFound" back={true} />
        <Content>Not Found</Content>
        <Footer />
      </FlexLayout>
    );
  }
}

export default NotFound;


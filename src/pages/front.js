import React from 'react';

import Main from '../layouts/Main';
import NewsFeed from '../components/presentational/NewsFeed';
import withData from '../helpers/withData';


export default withData(props => (
  <Main currentURL={props.url.pathname}>
    <span>total</span>
  </Main>
));

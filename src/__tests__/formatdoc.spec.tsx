import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/formatdoc';

describe('Format Doc Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);

    expect(app).toBeDefined();
  });
});

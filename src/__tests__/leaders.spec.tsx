import * as React from 'react';
import { shallow } from 'enzyme';

import Page from '../../pages/leaders';

describe('Leaders Page', () => {
  it('is defined', () => {
    const app = shallow(<Page serverState={{}} />);

    expect(app).toBeDefined();
  });
});

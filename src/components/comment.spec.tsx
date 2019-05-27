import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import * as React from 'react';

import { sampleData } from '../data/sample-data';
import { Comment } from './comment';

const comment = sampleData.comments[0];
// Snapshot will be out of date if we don't use consistent time ago for comment
// comment.creationTime = new Date().valueOf();
MockDate.set(1506022129802);

describe('Comment component', () => {
  it('shallow renders', () => {
    const wrapper = shallow(<Comment {...comment} indentationLevel={0} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a comment passed in as props', () => {
    const wrapper = shallow(<Comment {...comment} indentationLevel={0} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders at different indentation levels', () => {
    const wrapper = shallow(<Comment {...comment} indentationLevel={0} />);
    expect(wrapper).toMatchSnapshot();
  });
});

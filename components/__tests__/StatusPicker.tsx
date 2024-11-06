import * as React from 'react';
import renderer from 'react-test-renderer';

import { StatusPicker } from '../picker/StatusPicker';

it(`renders correctly`, () => {
  const tree = renderer.create(<StatusPicker
    onChange={() => {}}
    status={1}
    options={[
      {
      label: 'All',
      value: 1
    },
      {
      label: 'Pending',
      value: 2
    },
      {
      label: 'Complete',
      value: 3
    },
  ]}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

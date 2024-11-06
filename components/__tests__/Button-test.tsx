import * as React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../button/Button';

it(`renders correctly`, () => {
  const tree = renderer.create(<Button onPress={() => {}} title='title' />).toJSON();

  expect(tree).toMatchSnapshot();
});

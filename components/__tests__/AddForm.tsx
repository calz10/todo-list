import * as React from 'react';
import renderer from 'react-test-renderer';

import { AddTodoForm } from '../forms/AddTodoForm';

it(`renders correctly`, () => {
  const tree = renderer.create(<AddTodoForm dueDate={"1730909577228"} description='test' onChangeText={() => {}} onSave={() => {}} status={1} title='Test Tile'/>).toJSON();

  expect(tree).toMatchSnapshot();
});

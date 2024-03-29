import React from 'react';
import { shallow } from 'enzyme';
import DisplayWidget from './DisplayWidget';
import { Card, Button } from '@mui/material';
import { DialogEdit } from '../dialogEdit';
import { DialogDelete } from '../dialogDelete';

describe('DisplayWidget Component', () => {
  let wrapper;
  const widget = {
    name: 'Test Widget',
    price: 10,
    description: 'This is a test widget',
  };
  const fetchWidgets = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<DisplayWidget widget={widget} fetchWidgets={fetchWidgets} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a Card component', () => {
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it('renders widget name, price, and description', () => {
    expect(wrapper.text()).toContain(widget.name);
    expect(wrapper.text()).toContain(widget.price);
    expect(wrapper.text()).toContain(widget.description);
  });

  it('renders a DialogEdit component when "Edit" Button is clicked', () => {
    wrapper.find(Button).at(1).simulate('click');
    expect(wrapper.find(DialogEdit)).toHaveLength(1);
  });

  it('renders a DialogDelete component when "Delete" Button is clicked', () => {
    wrapper.find(Button).at(3).simulate('click');
    expect(wrapper.find(DialogDelete)).toHaveLength(1);
  });

  it('calls fetchWidgets function after successful edit', async () => {
    const dialogEdit = wrapper.find(DialogEdit);
    await dialogEdit.props().onSubmit(widget.name, { price: 20, description: 'Updated description' });
    expect(fetchWidgets).toHaveBeenCalled();
  });

  it('calls fetchWidgets function after successful delete', async () => {
    const dialogDelete = wrapper.find(DialogDelete);
    await dialogDelete.props().onSubmit(widget.name);
    expect(fetchWidgets).toHaveBeenCalled();
  });
});

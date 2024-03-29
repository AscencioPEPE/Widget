import React from 'react';
import { shallow } from 'enzyme';
import WidgetList from './WidgetList';
import { Button, TextField } from '@mui/material';
import { DialogCreate } from '../dialogCreate';
import { DialogShow } from '../dialogShow';
import { DialogError } from '../dialogError';

describe('WidgetList Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WidgetList />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a Button to create a widget', () => {
    expect(wrapper.find(Button).at(0).text()).toBe('Create your own Widget!!');
  });

  it('renders a TextField for searching', () => {
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  it('renders a Button for searching', () => {
    expect(wrapper.find(Button).at(1).text()).toBe('Search for your Widget!!');
  });

  it('renders DialogCreate component when "Create your own Widget!!" Button is clicked', () => {
    wrapper.find(Button).at(0).simulate('click');
    expect(wrapper.find(DialogCreate)).toHaveLength(1);
  });

  it('renders DialogShow component when searching and "Search for your Widget!!" Button is clicked', () => {
    const searchTerm = 'widget';
    wrapper.find(TextField).simulate('change', { target: { value: searchTerm } });
    wrapper.find(Button).at(1).simulate('click');
    expect(wrapper.find(DialogShow)).toHaveLength(1);
  });

  it('renders DialogError component when there is an error', () => {
    wrapper.setState({ openDialogError: true });
    expect(wrapper.find(DialogError)).toHaveLength(1);
  });

  it('calls searchWidgetByName when "Search for your Widget!!" Button is clicked', () => {
    const searchTerm = 'widget';
    const searchWidgetByNameSpy = jest.spyOn(wrapper.instance(), 'searchWidgetByName');
    wrapper.find(TextField).simulate('change', { target: { value: searchTerm } });
    wrapper.find(Button).at(1).simulate('click');
    expect(searchWidgetByNameSpy).toHaveBeenCalledWith(searchTerm);
  });

  it('calls onSubmitCreate when creating a widget', () => {
    const onSubmitCreateSpy = jest.spyOn(wrapper.instance(), 'onSubmitCreate');
    const widgetData = { name: 'Test Widget', description: 'Test Description', price: 10.99 };
    wrapper.instance().onSubmitCreate(widgetData);
    expect(onSubmitCreateSpy).toHaveBeenCalledWith(widgetData);
  });
});

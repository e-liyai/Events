import Home from '../../src/components/Home.jsx';
import store from '../../src/store';
import React from 'react';
import jest from 'jest';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import mockument from 'mockument';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

describe('Test suites for Home component', () => {
	const centers = [
		{
			id: 1,
			name: 'emporium',
      description: 'awesome place',
      favorites: [{userId: 11, centerId: 33}],
			price: 400
		},
		{
			id: 2,
			name: 'emporium',
      description: 'awesome place',
      favorites: [{userId: 88, centerId: 36}],
			price: 400
    },
    {
			id: 3,
			name: 'emporium3',
      description: 'awesome place',
      favorites: [{userId: 88, centerId: 36}],
			price: 400
		}
	];

	beforeEach(() => {
    mockument(`client/__test__/mocks/index.html`);
    localStorage.setItem('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7
    ImlkIjo4OCwidXNlcm5hbWUiOiJhbmRyZXciLCJlbWFpbCI6ImZvbzExQGZvby5jb20iLCJwYXNzd29yZCI
    6IiQyYSQxMCQxamVtekFla1kxQWluY3h1RC5WSlNPRXhJNXVpSlU0dDdicktDUHpjME1pZkZSNU1nVVQ3aSIs
    ImlzQWRtaW4iOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDE4LTAzLTEwVDIwOjU1OjQ1LjIzN1oiLCJ1cGRhdGVkQXQiOiIyMDE4LTAzLTEwVDIwOjU1OjQ1LjIzN1oifSwiaWF0IjoxNTIwNz
    E3MzkyLCJleHAiOjE1MjA4OTAxOTJ9.vtV9eRx_6OpJOw_cvBIlztCmQVRqvuJFwmo2trxy1B0`);
	});
	it('renders without crashing', () => {
		const wrapper = mount(<Home getCenters={(index) => index} centers={centers} />);
		expect(wrapper.length).toEqual(1);
	});

	it('renders with all list of centers', () => {
		const wrapper = mount(<Home getCenters={(index) => index} centers={centers} />);
		expect(wrapper.find('.displayed').length).toEqual(3);
	});

	it('adds extra centers to the list of centers', () => {
		const getCenters = sinon.spy();
		const wrapper = mount(<Home getCenters={getCenters} centers={centers} />);
		expect(getCenters.calledOnce).toEqual(true);
		wrapper.find('.testx').simulate('click');
		expect(getCenters.calledWith(6)).toEqual(true);
  });

  it('calls the addFavorite function on click', () => {
    const addFavorite = sinon.spy();
    const getCenters = sinon.spy();
		const wrapper = mount(<Home addFavorite={addFavorite} getCenters={getCenters} centers={centers} />);
		expect(getCenters.calledOnce).toEqual(true);
    wrapper.find('.favorite').at(1).simulate('click');
		expect(addFavorite.calledOnce).toEqual(true);
	});

	it('renders links to signup and signin properly', () => {
		const wrapper = mount(<Home getCenters={(index) => index} centers={centers} />);
		expect(wrapper.find('Link').at(1).prop('to')).toEqual('/auth/signup');
		expect(wrapper.find('Link').at(0).prop('to')).toEqual('/user/events');
  });

  it('calls setFavoriteCenter method', () => {
    const pathname = {pathname: 'hello'};
    const event = {name: 'jane09'};
		const wrapper = mount(
			<Home getCenters={(index) => index} centers={centers} />
		);
    wrapper.instance().setFavoriteCenter(centers);
  });

	it('calls the changePassword function when the form is submited', () => {
		const changePassword = sinon.spy();
		const wrapper = mount(
			<Home getCenters={(index) => index} changePassword={changePassword} centers={centers} />
		);
		const dummy = {
			old_pass: '',
			new_pass: '',
			con_pass: ''
		};
		const test = function() {
			return null;
		};
		const e = { preventDefault: test };
		wrapper.instance().handleSubmit(e);
		expect(changePassword.calledOnce).toEqual(true);
		expect(changePassword.calledWith(dummy)).toEqual(true);
	});
});

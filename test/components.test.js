import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import { expect } from 'chai';
import { Register } from '../src/components/register/Register';
import { SignIn } from '../src/components/signIn/SignIn';


const adapter = new Adapter();
Enzyme.configure({ adapter });


describe('The React Components', () => {

    describe('<Register/> component', () => {
        let registerWrapper;

        before('Create component', () => registerWrapper = shallow(<Register/>));

        it('renders an <h2>', () => expect(registerWrapper.find('h2')).to.have.length(1));

        it('renders an <hr/>', () => expect(registerWrapper.find('hr')).to.have.length(1));
    })

})
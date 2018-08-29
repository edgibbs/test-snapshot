import React from 'react'
import {shallow} from 'enzyme'
import ScreeningCreateRelationship from 'views/ScreeningCreateRelationship'

describe('ScreeningCreateRelationship', () => {
  let onCancel
  let wrapper
  const candidates = [{
    person: {
      age: '20 yrs',
      dateOfBirth: '01/15/1986',
      id: '1',
      gender: 'Male',
      legacyId: '3',
      name: 'Gohan',
    },
    candidate: {
      age: '30 yrs',
      dateOfBirth: '11/11/1958',
      id: '4157',
      gender: 'Male',
      name: 'Goku',
    },
  }, {
    person: {
      age: '20 yrs',
      dateOfBirth: '01/15/1986',
      id: '1',
      gender: 'Male',
      legacyId: '3',
      name: 'Trunks',
    },
    candidate: {
      age: '40 yrs',
      dateOfBirth: '11/11/1968',
      id: '4158',
      gender: 'Male',
      name: 'Vegeta',
    },
  }]
  const props = {
    onChange: () => {},
    personId: '805',
    candidates: candidates,
  }

  beforeEach(() => {
    onCancel = jasmine.createSpy('onCancel')
    wrapper = shallow(<ScreeningCreateRelationship {...props} onCancel={onCancel}/>)
  })

  it('has a button', () => {
    expect(wrapper.find('button').length).toBe(1)
  })
  it('has a ModalComponent', () => {
    expect(wrapper.find('ModalComponent').length).toBe(1)
  })

  it('has two buttons on modalFooter', () => {
    const footer = shallow(wrapper.find('ModalComponent').props().modalFooter)
    expect(footer.find('button').length).toBe(2)
  })

  it('simulate a click on button and show modal', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.instance().state.show).toBe(true)
  })

  it('passes the props to CreateRelationshipForm', () => {
    const formComponent = wrapper.find('ModalComponent').props().modalBody
    expect(formComponent.props.candidates).toEqual(candidates)
  })

  describe('closeModal', () => {
    it('closes the modal and on cancel have been called', () => {
      wrapper.setState({show: true})
      expect(wrapper.instance().state.show).toBe(true)
      wrapper.instance().closeModal()
      expect(wrapper.instance().state.show).toEqual(false)
      expect(onCancel).toHaveBeenCalled()
      expect(onCancel).toHaveBeenCalledWith('805')
    })

    it('closes the modal when the cancel button is clicked', () => {
      wrapper.setState({show: true})
      const footer = wrapper.find('ModalComponent').props().modalFooter
      const cancel = footer.props.children[0]
      expect(wrapper.state().show).toEqual(true)
      cancel.props.onClick()
      expect(wrapper.state().show).toEqual(false)
    })
  })

  describe('handleShowModal', () => {
    it('set the state show to its inverse', () => {
      wrapper.setState({show: true})
      expect(wrapper.instance().state.show).toBe(true)
      wrapper.instance().handleShowModal()
      expect(wrapper.instance().state.show).toEqual(false)
    })
  })
})

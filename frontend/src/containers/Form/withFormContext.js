import React, { Component } from "react";
import { FormContext } from "../context";

/**
 * This methods allows passing context of the Form to specific component.
 *
 * @example
 * import withFormContext from '../../HOC/withFormContext';
 * const ComponentX = ({test}) => (<h1>TestComponent</h1>);
 * export default withFormContext(ComponentX);
 *
 * @param {Component} WrappedComponent - Component field to wrap.
 *
 * @returns {Component} Returns wrapped component with form Context.
 */
export default function wrapper(WrappedComponent) {
  return function withFormContext(props) {
    return (
      <FormContext.Consumer>
        {context => <WrappedComponent {...context} {...props} />}
      </FormContext.Consumer>
    );
  };
}

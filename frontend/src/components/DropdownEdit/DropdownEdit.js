import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome'
export default class DropdownEdit extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <Dropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle>
                    <FontAwesome
                        name='wrench'

                    />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Vote up</DropdownItem>
                    <DropdownItem>Vote down</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}
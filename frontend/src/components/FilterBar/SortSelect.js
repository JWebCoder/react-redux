import React , {Component} from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router';
import {sortByCritera} from '../../actions/sort';
import {connect} from 'react-redux';
const all =[
    {label: 'All',
        value: 'all',
        path :''}]
class SortSelect extends Component{
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {
                label:'Date',
                value:'timestamp'
                },
                {
                    label:'Vote Score',
                    value:'voteScore'
                },
                {
                    label:'Nb comment',
                    value:'commentCount'
                },
            ],
        };
    }

    handleChange(value){
        console.log(value)
        this.props.sortByCritera(value.value)
    }
    render() {
        const {options} = this.state;
        return (

            <Select
                name="form-field-name"
                className="selectInput"
                placeholder='Sort by'
                clearable={false}
                onChange={value => this.handleChange(value)}
                options={options}
            />
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        sortByCritera: newState => {
            dispatch(sortByCritera(newState));
        },
    };
}

export default connect(null,mapDispatchToProps)(SortSelect)
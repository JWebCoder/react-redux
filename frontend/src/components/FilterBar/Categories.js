import React , {Component} from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router';
import {getListCategories} from "../../apiService/api";
import {sortByCategory} from '../../actions/sort';
import {connect} from 'react-redux';
const all =[
    {label: 'All',
        value: 'all',
        path :''}]
class Categories extends Component{
    constructor(props) {
        super(props);
        this.state = {
            categorie: all,
            options: [],
        };
    }
    componentDidMount(){
        getListCategories(args => this.setOptions(args))
    }
    setOptions(data){
        let options = data.map(o =>({
            label:o.name,
            value: o.name,
            path: o.path
        }));

        this.setState({
            options : all.concat(options)
        })
    }
    handleChange(value){
        console.log(value)
        this.props.history.push(`/${value.path}`)
        this.props.sortByCategory({
            name: value.value,
            path: value.path
        })
    }
    render() {
        const {categorie,options} = this.state;
        return (

            <Select
                name="form-field-name"
                value={categorie && categorie.value}
                className="selectInput"
                placeholder='Categorie'
                clearable={false}
                onChange={value => this.handleChange(value)}
                options={options}
            />
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        sortByCategory: newState => {
            dispatch(sortByCategory(newState));
        },
    };
}

export default connect(null,mapDispatchToProps)(Categories)
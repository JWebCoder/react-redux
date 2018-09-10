import React , {Component, Fragment} from 'react';
import {Col,Row} from 'reactstrap'
import Categories from "./Categories";
import SortSelect from "./SortSelect";
import {LayoutContext} from '../../util/context'

const FilterBar = () =>(
    <LayoutContext.Consumer>
        {value =>
            <Row>
                <Col className='col-8'>
                    <Categories history={value.history}/>
                </Col>
                <Col className='col-4'>
                    <SortSelect/>
                </Col>
            </Row>}
    </LayoutContext.Consumer>
)
export default FilterBar
import React from 'react';
import { TABSORTOPTIONS} from  '../../actions/tabSort'
import SortButton from '../../containers/tabs/sortButton'

const TabSort = () =>
{
    return ( 
        [
            <SortButton key={TABSORTOPTIONS.DATE} sort={TABSORTOPTIONS.DATE} sortDirection="DESC">Date</SortButton>,
            <SortButton key={TABSORTOPTIONS.SCORE} sort={TABSORTOPTIONS.SCORE} sortDirection ="DESC">Score</SortButton>]
    )
}

export default TabSort
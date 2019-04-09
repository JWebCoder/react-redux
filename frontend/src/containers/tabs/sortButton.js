import { connect } from 'react-redux'
import Button from '../../components/button'
import {setTabSortSortingPostList} from '../../actions/tabSort'

const mapStateToProps = (state, ownProps) => {
  return {
    sortDirection: state.tabSort.sort && state.tabSort.sort === ownProps.sort ? state.tabSort.sortDirection : ""
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {dispatch(setTabSortSortingPostList(ownProps.sort, ownProps.sortDirection))}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
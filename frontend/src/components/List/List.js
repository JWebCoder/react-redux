import React from "react";

import styles from "./styles.module.css";
import Item from "./Item";

const List = ({
  horizontal,
  datasource,
  onRow,
  onItemClick,
  onBottomScroll
}) => (
  <div
    onScroll={e => {
      const bottom =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

      bottom && onBottomScroll();
    }}
    className={horizontal ? styles.listHorizontal : styles.list}
  >
    {datasource.map((item, i) => (
      <Item key={i} onClick={() => onItemClick(item, i)}>
        {onRow(item, i)}
      </Item>
    ))}
  </div>
);

export default List;

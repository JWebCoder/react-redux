import React from "react";

import styles from "./styles.module.css";

const List = ({ horizontal, datasource, onRow, onBottomScroll }) => (
  <div
    onScroll={e => {
      const bottom =
        e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

      bottom && onBottomScroll();
    }}
    className={horizontal ? styles.listHorizontal : styles.list}
  >
    {datasource.map((item, i) => onRow(item, i))}
  </div>
);

export default List;

import React from 'react';

import styles from './styles.module.css';

const buildCss = (
  paddingHorizontal, paddingVertical, hidden, extendCss, marginBottom, noGutters, marginVertical, marginLeft,
) => {
  if (hidden) {
    return styles.hidden;
  }
  const gutters = noGutters ? '' : styles.gutters;
  const cssArr = [styles.row, gutters];

  marginBottom && cssArr.push(styles[`marginBottom-${marginBottom}`]);
  marginVertical && cssArr.push(styles[`marginVertical-${marginVertical}`]);
  paddingHorizontal && cssArr.push(styles[`paddingHorizontal-${paddingHorizontal}`]);
  paddingVertical && cssArr.push(styles[`paddingVertical-${paddingVertical}`]);
  marginLeft && cssArr.push(styles[`marginLeft-${marginLeft}`]);

  extendCss && cssArr.push(extendCss);
  return cssArr.join(' ');
};

const Row = ({
  children, rowRef, extendCss, paddingHorizontal, paddingVertical, hidden, marginBottom, noGutters, marginVertical, marginLeft, testId
}) => (
  <div ref={rowRef} className={`${buildCss(paddingHorizontal, paddingVertical, hidden, extendCss, marginBottom, noGutters, marginVertical, marginLeft)}`} data-test={testId}>
    {children}
  </div>
);

export default Row;

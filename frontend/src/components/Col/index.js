import React from 'react';

import styles from './styles.module.css';

const buildCss = ({
  col, flex,
  justifyContentBetween,
  justifyContentEnd, justifyContentStart,
  xl, md, sm, alignItemsCenter,
  marginHorizontal,
  paddingVertical,
  paddingHorizontal,
  extendClass,
  direction,
}) => {
  const cssArr = [styles[`col-${col}`]];

  flex && cssArr.push(styles.flex);
  justifyContentBetween && cssArr.push(styles.justifyContentBetween);
  justifyContentStart && cssArr.push(styles.justifyContentStart);
  justifyContentEnd && cssArr.push(styles.justifyContentEnd);
  alignItemsCenter && cssArr.push(styles.alignItemsCenter);

  paddingVertical && cssArr.push(styles[`paddingVertical-${paddingVertical}`]);
  paddingHorizontal && cssArr.push(styles[`paddingHorizontal-${paddingHorizontal}`]);
  marginHorizontal && cssArr.push(styles[`marginHorizontal-${marginHorizontal}`]);
  direction && cssArr.push(styles[`flexDirection-${direction}`]);

  const responsiveConfigs = ['col-sm', 'col-md', 'col-xl'].map((value, index) => {
    if (xl && (value === 'col-xl')) {
      return styles[`${value}-${xl}`];
    }

    if (md && (value === 'col-md')) {
      return styles[`${value}-${md}`];
    }

    if (sm && (value === 'col-sm')) {
      return styles[`${value}-${sm}`];
    }

    return styles[`${value}-${col}`];
  });


  extendClass && cssArr.push(extendClass);
  const finalArrClasses = [...cssArr, ...responsiveConfigs];

  return finalArrClasses.join(' ');
};

/**
 * This is one high order component that represents one screen header with a given structure.
 *
 * It receives some children components to be rendered in the following order on a 2*2 grid:
 * - first children on top left;
 * - second children on bottom letf;
 * - third children on bottom right;
 *
 * In case of four children, the third child will be positioned next to the second child, and the fourth one will be
 * on bottom right.
 *
 * @param {Object} param - One object with the children components to be rendered.
 */
const Col = ({
  children,
  onClick,
  hidden,
  testId,
  ...cssProps
}) => (
  <div hidden={hidden} onClick={onClick} className={`${buildCss(cssProps)}`} data-test={testId}>
    {children}
  </div>
);


export default Col;

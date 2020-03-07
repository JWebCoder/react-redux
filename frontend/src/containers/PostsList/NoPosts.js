import React from "react";

import { useTranslations } from "../useTranslations";

import styles from "./styles.module.css";

/**
 * Display no posts information on 100vh height
 */
const NoPosts = () => {
  const [translations] = useTranslations("posts_list");
  return (
    <React.Fragment>
      <h1 className={styles.noPosts}>{translations.nodata_title}</h1>
      <h4 className={styles.noPosts}>{translations.nodata_hint}</h4>
    </React.Fragment>
  );
};

export default NoPosts;

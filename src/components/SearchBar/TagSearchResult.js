import React from 'react';
import styles from './TagSearchResult.module.css';

const TagSearchResult = ({ isFocus, options, search, updateSelectedTags }) => {
  const regex = new RegExp(`^${search}`, 'i');

  const filterOptions = () => {
    const filtered = options.filter((option) => regex.test(option));
    return filtered;
  };

  const enterKeyPress = (event, tabbedTag) => {
    if (event.keyCode === 13) {
      updateSelectedTags(tabbedTag);
    }
  };

  return (
    <>
      {isFocus && search !== '' && filterOptions().length > 0 && (
        <div className={styles.tagList}>
          {filterOptions().map((tag, index) => {
            return (
              <div
                className={styles.result}
                key={index}
                onClick={() => updateSelectedTags(tag)}
                tabIndex="0"
                onKeyDown={(event) => enterKeyPress(event, tag)}
              >
                {tag}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default TagSearchResult;

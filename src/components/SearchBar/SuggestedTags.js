import React from 'react';
import styles from './SuggestedTags.module.css';

const SuggestedTags = ({ focusSearchInput, selectedTags, setSelectedTags }) => {
  const suggestedTagClick = (event, suggestedTag) => {
    event.preventDefault();
    if (selectedTags.includes(suggestedTag)) {
      alert('Duplicate Tag');
      focusSearchInput();
    } else {
      setSelectedTags([...selectedTags, suggestedTag]);
      focusSearchInput();
    }
  };

  return (
    <>
      <p className={styles.suggestedTitle}>suggested</p>
      <button
        type="button"
        className={styles.tagButton}
        onClick={(event) => {
          suggestedTagClick(event, event.target.value);
        }}
        value="JavaScript"
      >
        JavaScript
      </button>
      <button
        type="button"
        className={styles.tagButton}
        onClick={(event) => {
          suggestedTagClick(event, event.target.value);
        }}
        value="React"
      >
        React
      </button>
      <button
        type="button"
        className={styles.tagButton}
        onClick={(event) => {
          suggestedTagClick(event, event.target.value);
        }}
        value="HTML"
      >
        HTML
      </button>
      <button
        type="button"
        className={styles.tagButton}
        onClick={(event) => {
          suggestedTagClick(event, event.target.value);
        }}
        value="CSS"
      >
        CSS
      </button>
    </>
  );
};

export default SuggestedTags;

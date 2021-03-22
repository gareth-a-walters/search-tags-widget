import React, { useState, useEffect, useRef } from 'react';
import TagSearchResult from './TagSearchResult';
import SuggestedTags from './SuggestedTags';
import styles from './TagSearchBar.module.css';
import jsondata from '../data/MockData.json';

const TagSearchBar = () => {
  const [options, setOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [isFocus, setIsFocus] = useState(true);
  const mainContainerRef = useRef(null);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const data = jsondata.map((value) => value.tag);
    setOptions(data);
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      const { current: main } = mainContainerRef;
      if (main && !main.contains(event.target)) {
        setIsFocus(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mainContainerRef, setSelectedTags]);

  const focusSearchInput = () => {
    searchBarRef.current.focus();
    setIsFocus(true);
  };

  const updateSelectedTags = (newTag) => {
    if (selectedTags.includes(newTag)) {
      setSearch('');
      alert('Duplicate Tag');
      focusSearchInput();
    } else {
      setSelectedTags([...selectedTags, newTag]);
      setSearch('');
      focusSearchInput();
    }
  };

  const removeTagClick = (event, selectedTag) => {
    event.preventDefault();
    setSelectedTags((previousTags) =>
      previousTags.filter((tag) => tag !== selectedTag)
    );
  };

  const handleInputChange = (input) => {
    const regex = new RegExp(/[^a-z#. ]/gi);
    const newInput = input.value.replace(regex, '');
    setSearch(newInput);
  };

  const handleDistinctKeyDown = (event, searchInput) => {
    if (event.keyCode === 13 && searchInput === '') {
      event.preventDefault();
    } else if (event.keyCode === 13 && searchInput !== '') {
      event.preventDefault();
      updateSelectedTags(searchInput);
    } else if (
      event.keyCode === 8 &&
      searchInput === '' &&
      selectedTags.length > 0
    ) {
      event.preventDefault();
      setSelectedTags((previousTags) => [
        ...previousTags.slice(0, previousTags.length - 1),
      ]);
    }
  };

  return (
    <>
      <h5 className={styles.tagSearchLabel}>Add your programming languages</h5>
      <p className={styles.tagSearchLabelMicrocopy}>
        Add a custom tag by pressing enter. Remove by pressing backspace, or
        clicking tag.
      </p>
      <div
        className={styles.mainContainer}
        ref={mainContainerRef}
        onClick={() => {
          focusSearchInput();
        }}
      >
        <div className={styles.selectedTags}>
          {selectedTags.map((selectedTag, i) => {
            return (
              <button
                key={i}
                className={styles.tagButton}
                onClick={(event) => {
                  removeTagClick(event, selectedTag);
                }}
              >
                {selectedTag}
              </button>
            );
          })}
        </div>

        <div className={styles.searchBarContainer}>
          <div className={styles.searchBarWrapper}>
            <input
              type="text"
              className={styles.searchBarInput}
              ref={searchBarRef}
              value={search}
              onChange={(event) => handleInputChange(event.target)}
              onKeyDown={(event) => handleDistinctKeyDown(event, search)}
              style={{ width: `${search.length * 12}px` }}
              autoFocus
            />
          </div>
          <TagSearchResult
            isFocus={isFocus}
            options={options}
            search={search}
            updateSelectedTags={updateSelectedTags}
          />
        </div>
      </div>
      <SuggestedTags
        focusSearchInput={focusSearchInput}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
    </>
  );
};

export default TagSearchBar;

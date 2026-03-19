import styles from '../styles.module.scss';
import { useContext, useState, useRef } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';
import SelectBox from './SelectBox';

function Filter() {
    const {
        containerFilter,
        boxLeft,
        boxRight,
        selectBox,
        searchBar,
        products,
        searchBtn
    } = styles;
    const { sortOptions, setSortId, searchTerm, handleSearch } =
        useContext(OurShopContext);
    const refer = useRef();
    const getValueSelect = (value, type) => {
        if (type === 'sort') {
            setSortId(value);
        }
    };

    const handleSearchInput = (e) => {
        if (e.key === 'Enter') {
            const searchValue = e.target.value;
            if (searchValue.trim() === '') {
                // If input is empty, reset to show all products on page 1
                handleSearch('');
            } else {
                // If input has value, search with that value
                handleSearch(searchValue);
            }
        }
    };

    const handleSearchClick = () => {
        const searchValue = refer.current.value;
        if (searchValue.trim() === '') {
            // If input is empty, reset to show all products on page 1
            handleSearch('');
        } else {
            // If input has value, search with that value
            handleSearch(searchValue);
        }
    };

    return (
        <div className={containerFilter}>
            <div className={boxLeft}>
                <SelectBox
                    options={sortOptions}
                    getValue={getValueSelect}
                    className={selectBox}
                    type='sort'
                />
            </div>
            <div className={boxRight}>
                <input
                    type='text'
                    placeholder='Search products...'
                    className={searchBar}
                    onKeyDown={handleSearchInput}
                    ref={refer}
                />
                <button className={searchBtn} onClick={handleSearchClick}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Filter;

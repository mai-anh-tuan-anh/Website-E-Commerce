import styles from '../styles.module.scss';
import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';
import SelectBox from './SelectBox';
function Filter() {
    const { containerFilter, boxLeft, boxRight, selectBox } = styles;
    const { sortOptions, showOptions, setSortId, setShowId } =
        useContext(OurShopContext);
    const getValueSelect = (value, type) => {
        if (type === 'sort') {
            setSortId(value);
        } else if (type === 'show') {
            setShowId(value);
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
                <SelectBox
                    options={showOptions}
                    getValue={getValueSelect}
                    className={selectBox}
                    type='show'
                />
            </div>
        </div>
    );
}

export default Filter;

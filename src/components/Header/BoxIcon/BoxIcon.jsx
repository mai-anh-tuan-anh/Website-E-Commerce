import styles from '../styles.module.scss';
import fbicon from '@icons/svgs/fbicon.svg';
import tiktokicon from '@icons/svgs/tiktokicon.svg';
import youtubeicon from '@icons/svgs/youtubeicon.svg';
function BoxIcon({ type, href }) {
    const { boxIcon } = styles;
    const handleRenderIcon = (type) => {
        switch (type) {
            case 'fb':
                return fbicon;
            case 'tiktok':
                return tiktokicon;
            case 'youtube':
                return youtubeicon;
        }
    };
    return (
        <div className={boxIcon}>
            <img src={handleRenderIcon(type)} alt={type} />
        </div>
    );
}

export default BoxIcon;

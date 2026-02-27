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
        <a
            className={boxIcon}
            href={href}
            target='_blank'
            rel='noreferrer noopener'
            aria-label={type}
        >
            <img src={handleRenderIcon(type)} alt={type} />
        </a>
    );
}

export default BoxIcon;

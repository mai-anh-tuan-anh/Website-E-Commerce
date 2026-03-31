import styles from '../styles.module.scss';
function InfoCard({ title, description, src }) {
    const { containerCard, containerContent, tit, des } = styles;
    return (
        <div className={`${containerCard} w-full max-w-[360px] md:w-[280px]`}>
            <img width={40} height={41} src={src} alt={title} />
            <div className={containerContent}>
                <div className={tit}>{title}</div>
                <div className={des}>{description}</div>
            </div>
        </div>
    );
}

export default InfoCard;

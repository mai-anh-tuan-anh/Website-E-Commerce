import styles from './EmptyState.module.scss';

function EmptyState({ icon, title }) {
    const { emptyState, emptyStateIcon, emptyStateTitle } = styles;

    return (
        <div className={emptyState}>
            <div className={emptyStateIcon}>{icon}</div>
            <h3 className={emptyStateTitle}>{title}</h3>
        </div>
    );
}

export default EmptyState;

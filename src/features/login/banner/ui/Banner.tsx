import styles from "./Banner.module.scss"

export function Banner() {
    return (
        <>
            <div className={styles.bannerWrapper}>
                <div className={styles.bannerInner}>
                    <img className={styles.bannerImage} alt={"Banner"}
                         src="/src/shared/assets/images/welcome-banner.svg"
                         alt="Welcome"
                         onError={(e) => {
                             (e.target as HTMLImageElement).src = "https://via.placeholder.com/500x400?text=Welcome+Illustration";
                         }}
                    />
                </div>
            </div>
        </>
    )
}
import styles from './MainContainer.module.css';

type ContainerProps = {
  children: React.ReactNode;
};

export default function MainContainer({ children }: ContainerProps) {
  return <main className={styles.mainContainer}>{children}</main>;
}

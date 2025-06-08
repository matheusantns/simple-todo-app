import type { JSX } from 'react';
import styles from './MainContainer.module.css';

type ContainerProps = {
  children: React.ReactNode;
};

/**
 * MainContainer is a wrapper component that renders its children inside a main HTML element.
 *
 * @param {React.ReactNode} props.children - The content to be displayed inside the container.
 *
 * @returns {JSX.Element} The main container element wrapping the children.
 */
export default function MainContainer({ children }: ContainerProps): JSX.Element {
  return <main className={styles.mainContainer}>{children}</main>;
}

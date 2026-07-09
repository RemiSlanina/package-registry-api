import ErrorIcon from "./ErrorIcon";
import styles from "./ErrorMessage.module.css";
type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <p className={styles.error} role="alert">
      <ErrorIcon aria-hidden="true" />
      {message}
    </p>
  );
}

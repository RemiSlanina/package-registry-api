import type { Package } from "../models/Package";
import styles from "./PackageRow.module.css";
import RepositoryLink from "./RepositoryLink";

type Props = {
  pkg: Package;
  onDelete: (id: number) => void;
};

// destructuring Props
export default function PackageRow({ pkg, onDelete }: Props) {
  return (
    <li>
      <div className={styles.header}>
        <p>
          <strong className={styles.title}> {pkg.name}</strong>
        </p>{" "}
        <div className={styles.actions}>
          <button>Edit</button>
          <button type="button" onClick={() => onDelete(pkg.id)}>
            Delete
          </button>
        </div>
      </div>
      <div className={styles.details}>
        <hr />
        <p>{pkg.description}</p>

        <div>Language: {pkg.programmingLanguage}</div>
        {pkg.repositoryUrl ? (
          <p>
            <a
              href={pkg.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RepositoryLink url={pkg.repositoryUrl} />
            </a>
          </p>
        ) : (
          <p>No URL found.</p>
        )}
        <div>License: {pkg.license}</div>
      </div>
    </li>
  );
}

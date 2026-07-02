import type { Package } from "../models/Package";
import styles from "./PackageRow.module.css";
import RepositoryLink from "./RepositoryLink";

type Props = {
  pkg: Package;
};

// destructuring pkg
export default function PackageRow({ pkg }: Props) {
  return (
    <li>
      <p>
        <strong className={styles.title}> {pkg.name}</strong>
      </p>
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

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
        <strong className="title"> {pkg.name}</strong>
      </p>

      <p>{pkg.description}</p>
      <div className={styles.details}>
        <div>{pkg.programmingLanguage}</div>
        {pkg.repositoryUrl ? (
          <a href={pkg.repositoryUrl} target="_blank" rel="noopener noreferrer">
            <RepositoryLink url={pkg.repositoryUrl} />
          </a>
        ) : (
          <p>No URL found.</p>
        )}
        <div>{pkg.license}</div>
      </div>
    </li>
  );
}

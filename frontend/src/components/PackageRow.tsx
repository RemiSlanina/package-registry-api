import { useState } from "react";
import type { Package } from "../models/Package";
import PackageForm from "./PackageForm";
import styles from "./PackageRow.module.css";
import RepositoryLink from "./RepositoryLink";

type Props = {
  pkg: Package;
  onDelete: (id: number) => void;
  onUpdate: (pkg: Package) => void;
};

// destructuring Props
export default function PackageRow({ pkg, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function onSubmit(pkg: Package) {
    // checking args?
    onUpdate(pkg);
    setIsEditing(false);
  }
  function onCancel() {
    setIsEditing(false);
  }
  return (
    <>
      {isEditing ? (
        <li>
          <PackageForm
            pkg={pkg}
            onCancel={onCancel}
            onSubmit={onSubmit}
            // onSubmit={(pkg) => {
            //   onSubmit(pkg as Package);
            // }}
            title={"Edit"}
          />
        </li>
      ) : (
        <li className={styles.card}>
          <div className={styles.content}>
            <div className={styles.header}>
              <p>
                <strong className={styles.title}> {pkg.name}</strong>
              </p>{" "}
            </div>
            <div className={styles.details}>
              <hr />
              <p>{pkg.description}</p>

              <div>
                <p>Language: {pkg.programmingLanguage}</p>
              </div>
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
              <div>
                <p>License: {pkg.license}</p>
              </div>
            </div>{" "}
          </div>
          <hr />
          <div className={styles.actions}>
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button type="button" onClick={() => onDelete(pkg.id)}>
              Delete
            </button>
          </div>
        </li>
      )}
    </>
  );
}

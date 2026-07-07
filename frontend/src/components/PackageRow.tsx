import { useState } from "react";
import type { Package } from "../models/Package";
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
  const [name, setName] = useState<string>(pkg.name);
  const [description, setDescription] = useState<string>(pkg.description);
  return (
    <>
      {isEditing ? (
        <li>
          <label
            htmlFor="name"
            aria-label="Package name"
            aria-placeholder={name}
          >
            Name{" "}
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label
            htmlFor="description"
            aria-label="Package description"
            aria-placeholder={description}
          >
            <br />
            Description{" "}
          </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <br />
          <button
            type="button"
            onClick={() => {
              onUpdate({
                ...pkg,
                name: name,
                description: description,
              });
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setName(pkg.name);
              setDescription(pkg.description);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </li>
      ) : (
        <li>
          <div className={styles.header}>
            <p>
              <strong className={styles.title}> {pkg.name}</strong>
            </p>{" "}
            <div className={styles.actions}>
              <button type="button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
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
      )}
    </>
  );
}

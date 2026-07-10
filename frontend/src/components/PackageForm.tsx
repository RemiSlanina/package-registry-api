import { useState } from "react";
import type { NewPackage, Package } from "../models/Package";
import styles from "./PackageForm.module.css";

type Props<T extends Package | NewPackage> = {
  pkg: T;
  onSubmit: (pkg: T) => void;
  onCancel: () => void;
  title: string;
};

export default function PackageForm<T extends Package | NewPackage>({
  pkg,
  onSubmit,
  onCancel,
  title,
}: Props<T>) {
  console.log(styles);

  const [name, setName] = useState<string>(pkg.name);
  const [description, setDescription] = useState<string>(pkg.description);
  const [programmingLanguage, setProgrammingLanguage] = useState<string>(
    pkg.programmingLanguage,
  );
  const [repositoryUrl, setRepositoryUrl] = useState<string>(pkg.repositoryUrl);
  const [license, setLicense] = useState<string>(pkg.license);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit({
      ...pkg,
      name,
      description,
      programmingLanguage,
      repositoryUrl,
      license,
    } as T);
  }

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <div className={styles.header}>
          {" "}
          <p>
            <strong
              className={`${styles.title} ${
                title === "Create" ? styles.center : ""
              }`}
            >
              {title} Package
            </strong>
          </p>
        </div>
        <hr />

        <div className={styles.formGroup}>
          <label htmlFor="name">Name </label>
          <input
            required
            id="name"
            placeholder="name"
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="description">Description </label>
          <input
            required
            id="description"
            placeholder="description"
            type="text"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />{" "}
          <label htmlFor="programmingLanguage">Language </label>
          <input
            id="programmingLanguage"
            placeholder="JavaScript"
            type="text"
            name="programmingLanguage"
            value={programmingLanguage}
            onChange={(event) => setProgrammingLanguage(event.target.value)}
          />
          <label htmlFor="repositoryUrl">Repo </label>
          <input
            required
            id="repositoryUrl"
            placeholder="https://www.example.org"
            type="url"
            name="repositoryUrl"
            value={repositoryUrl}
            onChange={(event) => setRepositoryUrl(event.target.value)}
          />
          <label htmlFor="license">License </label>
          <input
            required
            id="license"
            placeholder="Apache License 2.0"
            type="text"
            name="license"
            value={license}
            onChange={(event) => setLicense(event.target.value)}
          />
          <hr />
          <div className={styles.actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

import { useState } from "react";
import type { Package } from "../models/Package";
import styles from "./PackageForm.module.css";

type Props = {
  pkg: Package;
  onSubmit: (pkg: Package) => void;
  onCancel: () => void;
  title: string;
};

export default function PackageForm({ pkg, onSubmit, onCancel, title }: Props) {
  const [name, setName] = useState<string>(pkg.name);
  const [description, setDescription] = useState<string>(pkg.description);
  const [programmingLanguage, setProgrammingLanguage] = useState<string>(
    pkg.programmingLanguage,
  );
  const [repositoryUrl, setRepositoryUrl] = useState<string>(pkg.repositoryUrl);
  const [license, setLicense] = useState<string>(pkg.license);
  return (
    <>
      <strong className={styles.header}>{title} Package</strong>
      <hr />
      <div className={styles.formgroup}>
        <label htmlFor="name" aria-label="Package name">
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
          Description{" "}
        </label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />{" "}
        <label htmlFor="programmingLanguage" aria-label="Package language">
          Language{" "}
        </label>
        <input
          type="text"
          name="programmingLanguage"
          value={programmingLanguage}
          onChange={(event) => setProgrammingLanguage(event.target.value)}
        />
        <label htmlFor="repositoryUrl" aria-label="Package repo">
          Repo{" "}
        </label>
        <input
          type="text"
          name="repositoryUrl"
          value={repositoryUrl}
          onChange={(event) => setRepositoryUrl(event.target.value)}
        />
        <label htmlFor="license" aria-label="Package license">
          License{" "}
        </label>
        <input
          type="text"
          name="license"
          value={license}
          onChange={(event) => setLicense(event.target.value)}
        />
        <hr />
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => {
              onSubmit({
                ...pkg,
                name,
                description,
                programmingLanguage,
                repositoryUrl,
                license,
              });
            }}
          >
            Save
          </button>
          <button type="button" onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import {
  createPackage,
  deletePackage,
  fetchPackages,
  updatePackage,
} from "../api/packages";
import type { NewPackage, Package } from "../models/Package";
import ErrorMessage from "./ErrorMessage";
import PackageForm from "./PackageForm";
import styles from "./PackageList.module.css";
import PackageRow from "./PackageRow";

export default function PackageList() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchPackages();
      setPackages(data);
    } catch (e) {
      console.error("Error loading Packages: ", e);
      setError("Could not load packages");
    } finally {
      setIsLoading(false);
    }
  }

  const emptyPkg = {
    name: "",
    description: "",
    programmingLanguage: "",
    repositoryUrl: "",
    license: "",
  };

  function onSubmit(pkg: NewPackage) {
    handleCreate(pkg);
  }
  function onCancel() {
    setIsCreating(false);
  }

  async function handleCreate(pkgToCreate: NewPackage): Promise<void> {
    try {
      setError(null);
      const createdPackage = await createPackage(pkgToCreate);
      setPackages((previous) => [...(previous ?? []), createdPackage]);
      setIsCreating(false);
    } catch (e) {
      console.log("Failed to create package: ", e);
      setError("Failed to create package");
    }
  }

  async function handleDelete(id: number): Promise<void> {
    try {
      setError(null);
      await deletePackage(id);

      setPackages((previous) => previous.filter((pkg) => pkg.id !== id));
    } catch (e) {
      console.log("Failed to delete package: ", e);
      setError("Failed to delete package");
    }
  }

  async function handleUpdate(pkgToUpdate: Package): Promise<void> {
    try {
      setError(null);
      await updatePackage(pkgToUpdate);

      // replace the package with a given id
      setPackages((previous) =>
        previous.map((p) => (p.id === pkgToUpdate.id ? pkgToUpdate : p)),
      );
    } catch (e) {
      console.log("Failed to update package: ", e);
      setError("Failed to update package");
    }
  }

  return (
    <>
      {isLoading && <p>Loading packages... </p>}{" "}
      {!isCreating && packages.length === 0 && (
        <p className={styles.centered}>No packages found ¯\_(ツ)_/¯ </p>
      )}
      {error && <ErrorMessage message={error} />}
      {isCreating ? (
        <PackageForm
          pkg={emptyPkg}
          onCancel={onCancel}
          onSubmit={onSubmit}
          title={"Create"}
        />
      ) : (
        <>
          <div className={styles.actions}>
            <button
              onClick={() => {
                setIsCreating(true);
              }}
            >
              Create Package
            </button>
          </div>
          <ul>
            {packages.map((pkg) => (
              <PackageRow
                key={pkg.id}
                pkg={pkg}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </ul>{" "}
        </>
      )}
    </>
  );
}

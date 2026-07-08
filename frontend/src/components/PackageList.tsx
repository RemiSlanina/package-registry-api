import { useEffect, useState } from "react";
import {
  createPackage,
  deletePackage,
  fetchPackages,
  updatePackage,
} from "../api/packages";
import type { NewPackage, Package } from "../models/Package";
import PackageForm from "./PackageForm";
import styles from "./PackageList.module.css";
import PackageRow from "./PackageRow";

export default function PackageList() {
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    // TODO: Handle loading errors.
    const data = await fetchPackages();
    setPackages(data);
  }

  const emptyPkg = {
    name: "name",
    description: "description",
    programmingLanguage: "programming language",
    repositoryUrl: "repository url",
    license: "license",
  };

  function onSubmit(pkg: NewPackage) {
    handleCreate(pkg);
  }
  function onCancel() {
    setIsCreating(false);
  }

  async function handleCreate(pkgToCreate: NewPackage): Promise<void> {
    //
    try {
      const createdPackage = await createPackage(pkgToCreate);
      setPackages((previous) => [...(previous ?? []), createdPackage]);
      setIsCreating(false);
    } catch (e) {
      console.log("Failed to create package: ", e);
    }
  }

  async function handleDelete(id: number): Promise<void> {
    try {
      await deletePackage(id);

      setPackages(
        (previous) => previous?.filter((pkg) => pkg.id !== id) ?? null,
      );
    } catch (e) {
      // TODO show banner
      console.log("Failed to delete package: ", e);
    }
  }

  async function handleUpdate(pkgToUpdate: Package): Promise<void> {
    // first, give the user the chance to update the package:

    //console.log(JSON.stringify(pkgToUpdate, null, 2));
    // const updatedPacked = {
    //   ...pkgToUpdate,
    //   name: Math.random().toString(),
    // };
    const updatedPacked = { ...pkgToUpdate };
    // TODO
    try {
      await updatePackage(updatedPacked);

      // replace the package with a given id
      setPackages(
        (previous) =>
          previous?.map((p) =>
            p.id === updatedPacked.id ? updatedPacked : p,
          ) ?? null,
      );
    } catch (e) {
      // TODO show banner
      console.log("Failed to update package: ", e);
    }
  }

  if (packages === null) {
    return <p>Loading packages... ¯\_(ツ)_/¯ </p>;
  }

  if (packages.length === 0) {
    return <p>No packages found ¯\_(ツ)_/¯</p>;
  }

  return (
    <>
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
              role="button"
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

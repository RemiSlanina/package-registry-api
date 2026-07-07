import { useEffect, useState } from "react";
import { deletePackage, fetchPackages, updatePackage } from "../api/packages";
import type { Package } from "../models/Package";
import PackageRow from "./PackageRow";

export default function PackageList() {
  const [packages, setPackages] = useState<Package[] | null>(null);

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    // TODO: Handle loading errors.
    const data = await fetchPackages();
    setPackages(data);
  }

  async function handleDelete(id: number): Promise<void> {
    try {
      await deletePackage(id);

      setPackages(
        (previous) => previous?.filter((pkg) => pkg.id !== id) ?? null,
      );
    } catch (e) {
      // TODO show banner
      console.log("Failed deletion attempt: ", e);
    }
  }

  async function handleUpdate(pkgToUpdate: Package): Promise<void> {
    // first, give the user the chance to update the package:

    console.log(JSON.stringify(pkgToUpdate, null, 2));
    const updatedPacked = {
      ...pkgToUpdate,
      name: Math.random().toString(),
    };
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
    <ul>
      {packages.map((pkg) => (
        <PackageRow
          key={pkg.id}
          pkg={pkg}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

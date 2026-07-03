import { useEffect, useState } from "react";
import { deletePackage, fetchPackages } from "../api/packages";
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

  async function handleDelete(id: number) {
    try {
      await deletePackage(id);

      setPackages(
        (previous) => previous?.filter((pkg) => pkg.id !== id) ?? null,
      );
    } catch (e) {
      console.log("Failed deletion attempt: ", e);
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
        <PackageRow key={pkg.id} pkg={pkg} onDelete={handleDelete} />
      ))}
    </ul>
  );
}

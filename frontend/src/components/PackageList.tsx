import { useEffect, useState } from "react";
import { fetchPackages } from "../api/packages";
import type { Package } from "../models/Package";
import PackageRow from "./PackageRow";

export default function PackageList() {
  const [packages, setPackages] = useState<Package[] | null>(null);

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    const data = await fetchPackages();
    console.log("data: ", data);
    setPackages(data);
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
        <PackageRow key={pkg.id} pkg={pkg} />
      ))}
    </ul>
  );
}

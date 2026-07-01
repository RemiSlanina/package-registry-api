import { useEffect, useState } from "react";
import { fetchPackages } from "../api/packages";
import type { Package } from "../models/Package";
import PackageRow from "./PackageRow";

export default function PackageList() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    const data = await fetchPackages();
    console.log("data: ", data);
    setPackages(data);
  }

  return (
    <ul>
      {packages.map((pkg) => (
        <PackageRow key={pkg.id} pkg={pkg} />
      ))}
    </ul>
  );
}

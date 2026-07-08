import type { NewPackage, Package } from "../models/Package";

export async function fetchPackages() {
  const response = await fetch("http://localhost:8000/packages");

  if (!response.ok) {
    throw new Error("Couldn't load packages");
  }
  return response.json();
}

export async function deletePackage(id: number) {
  // console.log("Deleting package:", id);
  // console.log(`http://localhost:8000/packages/${id}`);
  const response = await fetch(`http://localhost:8000/packages/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete package.");
  }

  // console.log("response: ", response);
}

export async function updatePackage(p: Package) {
  const response = await fetch(`http://localhost:8000/packages/${p.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });

  if (!response.ok) {
    throw new Error("Could not update package.");
  }
}

export async function createPackage(p: NewPackage) {
  const response = await fetch("http://localhost:8000/packages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });

  if (!response.ok) {
    throw new Error("Could not create package.");
  }
  return response.json();
}

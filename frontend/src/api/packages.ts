export async function fetchPackages() {
  console.log("Fetching:", "http://localhost:8000/packages");
  const response = await fetch("http://localhost:8000/packages");

  if (!response.ok) {
    console.log("Error loading packages");
    throw new Error("Couldn't load packages");
  }
  return response.json();
}

export async function deletePackage(id: number) {
  await fetch(`http://localhost:8000/packages/${id}`, {
    method: "DELETE",
  });
}

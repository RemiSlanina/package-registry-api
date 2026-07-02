export async function fetchPackages() {
  const response = await fetch("http://localhost:8000/packages");

  if (!response.ok) {
    throw new Error("Couldn't load packages");
  }
  return response.json();
}

export async function deletePackage(id: number) {
  await fetch(`http://localhost:8000/packages/${id}`, {
    method: "DELETE",
  });
}

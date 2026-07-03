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

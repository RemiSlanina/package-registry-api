export interface Package {
  id: number;
  name: string;
  description: string;
  programmingLanguage: string;
  repositoryUrl: string;
  license: string;
}

export type NewPackage = Omit<Package, "id">;

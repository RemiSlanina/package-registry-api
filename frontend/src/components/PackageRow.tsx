import type { Package } from "../models/Package";

type Props = {
  pkg: Package;
};
// { pkg } :
// PackageRow({
//     pkg: somePackage
// })
// destructuring
export default function PackageRow({ pkg }: Props) {
  return (
    <li>
      <strong> {pkg.name}</strong>
      <br />
      {pkg.description}
    </li>
  );
}

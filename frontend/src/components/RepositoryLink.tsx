import {
  FaBitbucket,
  FaCodeBranch,
  FaGithub,
  FaGitlab,
  FaLink,
} from "react-icons/fa";

type Props = {
  url: string;
};
const providers = [
  { domain: "github.com", icon: FaGithub, label: "GitHub" },
  { domain: "gitlab.com", icon: FaGitlab, label: "GitLab" },
  { domain: "codeberg.org", icon: FaCodeBranch, label: "Codeberg" },
  { domain: "bitbucket.org", icon: FaBitbucket, label: "Bitbucket" },
];
export default function RepositoryLink({ url }: Props) {
  const provider = providers.find((p) => url.includes(p.domain));
  const Icon = provider?.icon ?? FaLink;
  return (
    <>
      <Icon />
      {provider?.label ?? "Repository-Link"}
    </>
  );
}

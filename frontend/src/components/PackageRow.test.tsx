import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PackageRow from "./PackageRow";

const pkg = {
  id: 1,
  name: "Laravel",
  description: "PHP web application framework",
  programmingLanguage: "PHP",
  repositoryUrl: "https://github.com/laravel/framework",
  license: "MIT",
};

describe("PackageRow", () => {
  test("displays package information", async () => {
    render(<PackageRow pkg={pkg} onUpdate={() => {}} onDelete={() => {}} />);

    expect(screen.getByText("Laravel")).toBeInTheDocument();
    expect(
      screen.getByText("PHP web application framework"),
    ).toBeInTheDocument();
    expect(screen.getByText("Language: PHP")).toBeInTheDocument();
    expect(screen.getByText("License: MIT")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PackageForm from "./PackageForm";

describe("PackageForm", () => {
  test("shows create form", () => {
    render(
      <PackageForm
        title="Create"
        pkg={{
          name: "",
          description: "",
          programmingLanguage: "",
          repositoryUrl: "",
          license: "",
        }}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );

    expect(screen.getByText("Create Package")).toBeInTheDocument();
  });
});

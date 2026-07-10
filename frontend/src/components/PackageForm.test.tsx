import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import PackageForm from "./PackageForm";

const emptyPackage = {
  name: "",
  description: "",
  programmingLanguage: "",
  repositoryUrl: "",
  license: "",
};

const laravelPackage = {
  name: "Laravel",
  description: "PHP web application framework",
  programmingLanguage: "PHP",
  repositoryUrl: "https://github.com/laravel/framework",
  license: "MIT",
};

describe("PackageForm", () => {
  test("submits entered package data", async () => {
    const user = userEvent.setup();

    const onSubmit = vi.fn();

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
        onSubmit={onSubmit}
        onCancel={() => {}}
      />,
    );

    const nameInput = screen.getByLabelText("Name");
    await user.type(nameInput, "React");
    // needs all required inputs
    await user.type(screen.getByLabelText("Description"), "Libarary");
    await user.type(screen.getByLabelText("Repo"), "https://example.com");
    await user.type(screen.getByLabelText("License"), "MIT");

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByText("Create Package")).toBeInTheDocument();
    expect(nameInput).toHaveValue("React");
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        description: "Libarary",
        license: "MIT",
        name: "React",
        programmingLanguage: "",
        repositoryUrl: "https://example.com",
      }),
    );
  });

  test("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <PackageForm
        title="Create"
        pkg={emptyPackage}
        onSubmit={() => {}}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  test("shows existing package data when editing", async () => {
    render(
      <PackageForm
        title="Edit"
        pkg={laravelPackage}
        onSubmit={() => {}}
        onCancel={() => {}}
      />,
    );

    expect(screen.getByLabelText("Name")).toHaveValue("Laravel");
    expect(screen.getByLabelText("Description")).toHaveValue(
      "PHP web application framework",
    );
    expect(screen.getByLabelText("Repo")).toHaveValue(
      "https://github.com/laravel/framework",
    );
    expect(screen.getByLabelText("License")).toHaveValue("MIT");
  });
});

// const laravelPackage = {
//   name: "Laravel",
//   description: "PHP web application framework",
//   programmingLanguage: "PHP",
//   repositoryUrl: "https://github.com/laravel/framework",
//   license: "MIT",
// };

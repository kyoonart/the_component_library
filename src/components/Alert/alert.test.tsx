import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import Alert from "./alert";
const successProps = {
  onClose: jest.fn(),
  closable: true,
  title: "标题",
  description: "描述",
};
describe("test Alert component", () => {
  it("should render the correct default alert", () => {
    const { getByText, container } = render(<Alert></Alert>);
    expect(container.querySelector(".alert")).toBeInTheDocument();

    // 测试类型
    expect(container.querySelector(".alert")).toHaveClass(
      "alert alert-default"
    );
    expect(getByText("默认描述")).toBeInTheDocument();

    // 测试icon
    expect(container.querySelector(".alert-icon")).not.toBeInTheDocument();
  });

  it("should render the correct component based on different props", async () => {
    const { getByText, container } = render(
      <Alert {...successProps} type="success"></Alert>
    );
    expect(container.querySelector(".alert")).toBeInTheDocument();

    // 测试类型
    expect(container.querySelector(".alert")).toHaveClass(
      "alert alert-success"
    );

    // 测试标题
    expect(getByText("标题")).toHaveClass("alert-title");

    // 测试描述
    expect(getByText("描述")).toHaveClass("alert-desc");

    // 测试icon是否存在
    expect(container.querySelector(".alert-close")).toBeInTheDocument();
    const closeIcon = container.querySelector(
      ".alert-close"
    ) as HTMLButtonElement;
    fireEvent.click(closeIcon);
    expect(successProps.onClose).toHaveBeenCalled();
    await wait(() => {
      expect(container.querySelector(".alert")).not.toBeInTheDocument();
    });
  });
});

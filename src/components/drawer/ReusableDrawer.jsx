import React from "react";
import { Drawer as AntDrawer, Button } from "antd";

const ReusableDrawer = ({
  title = "Drawer",
  children,
  button,
  buttonTitle = "Reusable Drawer",
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const triggerButton = button ? (
    React.cloneElement(button, {
      onClick: () => setIsOpen(true),
    })
  ) : (
    <Button onClick={() => setIsOpen(true)}>{buttonTitle || title}</Button>
  );

  return (
    <>
      {triggerButton}

      <AntDrawer
        title={title}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        size="large"
        destroyOnClose
        {...rest}
      >
        {children}
      </AntDrawer>
    </>
  );
};

export default ReusableDrawer;

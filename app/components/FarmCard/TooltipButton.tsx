import { Tooltip, Button } from "@mantine/core";

const TooltipButton = ({ ...props }) => {
  const newProps = { ...props };

  if (props.disabled) {
    // delete newProps.disabled;
    newProps["data-disabled"] = true;
  }
  return (
    <Tooltip label={props.disabledtooltip} disabled={!props.disabled}>
      <Button {...newProps} />
    </Tooltip>
  );
};

export default TooltipButton;

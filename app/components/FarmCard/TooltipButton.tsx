import { Tooltip, Button } from "@mantine/core";

const TooltipButton = ({ ...props }) => {
  // const newProps = { ...props };

  // Todo: delete
  // if (props.disabled) {
  //   delete newProps.disabled;
  //   newProps["data-disabled"] = true;
  // }
  return (
    <Tooltip label={props.disabledtooltip} disabled={!props.disabled}>
      <Button {...props} />
    </Tooltip>
  );
};

export default TooltipButton;

import { Text, Stack, Modal, Space, Button, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import plant from "~/assets/plant.jpg";

const useStyles = createStyles((theme) => ({
  plant: {
    borderRadius: "100%",
    width: "100px",
    height: "100px",
  },
}));

interface ConfirmModalProps {
  opened: boolean;
  close: () => void;
}

const SuccessModal = ({ opened, close }: ConfirmModalProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { classes } = useStyles();

  return (
    <Modal
      opened={opened}
      onClose={close}
      fullScreen={isMobile}
      centered={!isMobile}
      size="auto"
    >
      <Stack align="center" justify="center" spacing="xs">
        <img src={plant} alt="Plant" className={classes.plant} />
        <Text size="lg" weight={700}>
          “Congrats! 🌿
        </Text>
        <Text size="md">You are now growing your impact and profits!</Text>
        <Space h="lg" />
        <Button variant="filled" onClick={close}>
          Close
        </Button>
      </Stack>
    </Modal>
  );
};

export default SuccessModal;
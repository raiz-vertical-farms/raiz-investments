import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Drawer,
  Box,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "~/components/assets/Logo";
import WalletButton from "./WalletButton";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => {
  return {
    inner: {
      height: HEADER_HEIGHT,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    links: {
      [theme.fn.smallerThan(parseInt(theme.breakpoints.sm, 10))]: {
        display: "none",
      },
    },

    burger: {
      [theme.fn.largerThan(parseInt(theme.breakpoints.sm, 10))]: {
        display: "none",
      },
    },

    link: {
      display: "block",
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      textDecoration: "none",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
    },

    linkLabel: {
      marginRight: rem(5),
    },
    svgContainer: {
      width: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "5px",
    },
  };
});

export default function HeaderComponent() {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  const links = [
    { label: "Farms", href: "/farms" },
    { label: "Investments", href: "/investments" },
  ];

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.href}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <Box>
      <Header height={HEADER_HEIGHT}>
        <Container className={classes.inner} fluid>
          <Group noWrap>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            <div className={classes.svgContainer}>
              <Logo />
            </div>
          </Group>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <WalletButton />
        </Container>
      </Header>
      <Drawer
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="md"
        title="Navigation"
        className="hiddenDesktop"
        zIndex={1000000}
      >
        {items}
      </Drawer>
    </Box>
  );
}

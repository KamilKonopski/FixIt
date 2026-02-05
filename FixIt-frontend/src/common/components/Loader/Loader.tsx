import { Center, Loader as MantineLoader } from "@mantine/core";

interface LoaderProps {
  size?: number | "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
}

const Loader = ({ size = "md", color = "fixit-blue" }: LoaderProps) => {
  return (
    <Center h="100vh" w="100vw">
      <MantineLoader size={size} color={color} type="bars" />
    </Center>
  );
};

export default Loader;

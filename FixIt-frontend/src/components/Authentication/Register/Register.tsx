import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Anchor,
  Text,
  SimpleGrid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { useRegisterMutation } from "../../../store/auth/authApi";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Nieprawidłowy email",
      password: (value) =>
        value.length < 6 ? "Hasło musi mieć co najmniej 6 znaków" : null,
      firstName: (value) =>
        value.trim().length < 2 ? "Imię jest wymagane" : null,
      lastName: (value) =>
        value.trim().length < 2 ? "Nazwisko jest wymagane" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await register(values).unwrap();

      notifications.show({
        title: "Sukces!",
        message: "Konto zostało utworzone. Możesz się teraz zalogować.",
        color: "green",
      });

      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notifications.show({
        title: "Błąd rejestracji",
        message:
          err.data || "Coś poszło nie tak. Spróbuj użyć innego adresu email.",
        color: "red",
      });
      console.error(err);
    }
  };

  return (
    <Container size={460} my={40}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Paper withBorder shadow="md" p={30} radius="md">
          <Title order={2} ta="center" mb="sm">
            Dołącz do FixIt
          </Title>
          <Text c="dimmed" size="sm" ta="center" mb={30}>
            Masz już konto?{" "}
            <Anchor
              size="sm"
              component="button"
              onClick={() => navigate("/login")}
            >
              Zaloguj się
            </Anchor>
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <SimpleGrid cols={2} mb="md">
              <TextInput
                label="Imię"
                placeholder="Twoje imię..."
                required
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Nazwisko"
                placeholder="Twoje nazwisko..."
                required
                {...form.getInputProps("lastName")}
              />
            </SimpleGrid>
            <TextInput
              label="Email"
              placeholder="Twój email..."
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Hasło"
              placeholder="Minimum 6 znaków"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <Button type="submit" fullWidth mt="xl" loading={isLoading}>
              Utwórz konto
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Register;

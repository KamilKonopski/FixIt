import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Anchor,
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useLoginMutation } from "../../../store/auth/authApi";
import { setCredentials } from "../../../store/slices/authSlice";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Błędny format email",
      password: (value) =>
        value.length < 6 ? "Hasło musi mieć min. 6 znaków" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setError(null);
      const userData = await login(values).unwrap();

      dispatch(setCredentials(userData));

      navigate("/dashboard");
    } catch (err) {
      setError("Nie udało się zalogować. Sprawdź dane.");
      console.error(err);
    }
  };

  return (
    <Container size={420} my={40}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper withBorder shadow="md" p={30} radius="md">
          <Title order={2} ta="center" mb="lg">
            Witaj w FixIt
          </Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="Twój email..."
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Hasło"
              placeholder="Twoje hasło..."
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            {error && (
              <div
                style={{ color: "red", fontSize: "12px", marginTop: "10px" }}
              >
                {error}
              </div>
            )}
            <Group justify="space-between" mt="lg">
              <Button type="submit" fullWidth loading={isLoading}>
                Zaloguj się
              </Button>
            </Group>
          </form>
          <Text c="dimmed" size="sm" ta="center" mt={15}>
            Nie masz jeszcze konta?{" "}
            <Anchor
              size="sm"
              component="button"
              type="button"
              onClick={() => navigate("/register")}
            >
              Zarejestruj się
            </Anchor>
          </Text>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group, Stack, Text, TextInput, Textarea } from "@mantine/core";

import { useCreateTicketMutation } from "../../../../store/tickets/ticketsApi";

import {
  ticketSchema,
  type TicketFormData,
} from "../../../../common/schemas/ticket.schema";

interface CreateUserTicketModalProps {
  onClose: () => void;
}

const RequiredLabel = ({ label }: { label: string }) => (
  <Group gap={4}>
    <Text size="sm" fw={500}>
      {label}
    </Text>
    <Text size="sm" c="fixit-error.6">
      *
    </Text>
    <Text size="xs" c="dimmed"></Text>
  </Group>
);

const CreateUserTicketModal = ({ onClose }: CreateUserTicketModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });
  const [createTicket, { isLoading, error }] = useCreateTicketMutation();

  const onSubmit = async (data: TicketFormData) => {
    try {
      await createTicket(data).unwrap();
      onClose();
    } catch (err) {
      console.error("Błąd tworzenia zgłoszenia: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          label={<RequiredLabel label="Tytuł zgłoszenia" />}
          placeholder="Np. Nie działa logowanie"
          {...register("title")}
          error={errors.title?.message}
        />
        <Textarea
          label={<RequiredLabel label="Opis problemu" />}
          placeholder="Opisz dokładnie, co się dzieje…"
          minRows={4}
          autosize
          {...register("description")}
          error={errors.description?.message}
        />
        {error && (
          <Text size="sm" c="red">
            Nie udało się utworzyć zgłoszenia
          </Text>
        )}
        <Group justify="flex-end" mt="md">
          <Button
            variant="subtle"
            color="gray"
            type="button"
            onClick={onClose}
            loading={isLoading}
          >
            Anuluj
          </Button>

          <Button type="submit" color="fixit-blue" loading={isLoading}>
            Utwórz zgłoszenie
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CreateUserTicketModal;

import ButtonIcon from "../ui/ButtonIcon";
import Text from "../ui/Text";

interface AppointmentItemProps {
  time: string;
  clientName: string;
  onDelete: () => void;
}

export default function AppointmentItem({
  time,
  clientName,
  onDelete,
}: AppointmentItemProps) {
  return (
    <div className="flex items-center justify-between bg-gray-600 p-4">
      <Text variant="title-m" className="text-gray-200 w-12">
        {time}
      </Text>
      <Text variant="text-m" className="flex-1 text-gray-300">
        {clientName}
      </Text>

      <ButtonIcon onClick={onDelete} />
    </div>
  );
}

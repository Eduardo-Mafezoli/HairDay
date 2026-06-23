import Icon from "./Icon";

export default function ButtonIcon() {
  return (
    <button className="hover:text-yellow-dark text-yellow cursor-pointer">
      <Icon name="trash" />
    </button>
  );
}

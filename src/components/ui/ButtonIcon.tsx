import Icon from "./Icon";

type ButtonIconProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonIcon({ ...props }: ButtonIconProps) {
  return (
    <button
      className="hover:text-yellow-dark text-yellow cursor-pointer"
      {...props}
    >
      <Icon name="trash" />
    </button>
  );
}

import type { IconWeight, Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  SunHorizonIcon,
  CloudSunIcon,
  UserSquareIcon,
  MoonStarsIcon,
  CaretDownIcon,
  CalendarBlankIcon,
  CaretRightIcon,
  CaretLeftIcon,
  TrashIcon,
} from "@phosphor-icons/react";

const iconMap = {
  sun: SunHorizonIcon,
  cloud: CloudSunIcon,
  user: UserSquareIcon,
  moon: MoonStarsIcon,
  caretDown: CaretDownIcon,
  calendar: CalendarBlankIcon,
  caretRight: CaretRightIcon,
  caretLeft: CaretLeftIcon,
  trash: TrashIcon,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  size?: number;
  weight?: IconWeight;
  className?: string;
}

export default function Icon({
  name,
  size = 24,
  weight = "regular",
  className,
}: IconProps) {
  const IconComponent = iconMap[name];

  return <IconComponent size={size} weight={weight} className={className} />;
}

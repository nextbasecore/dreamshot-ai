import Link from "next/link";
import { LogoIcon } from "@/components/Icons";

export default function Logo() {
  return (
    <Link href="/" className="text-xl font-bold">
      <LogoIcon className="w-40 h-fit" />
    </Link>
  );
}

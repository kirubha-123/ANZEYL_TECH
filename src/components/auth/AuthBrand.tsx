import Link from "next/link";
import { AnzeylLogoCentered } from "@/components/AnzeylLogo";

export function AuthBrand() {
  return (
    <Link href="/" className="mx-auto flex w-fit flex-col items-center gap-1 group">
      <AnzeylLogoCentered size={140} />
    </Link>
  );
}

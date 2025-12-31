import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Book, Home, Plus } from "lucide-react";
import Link from "next/link";

export const MobileNavLinks = () => {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <Link href="/" className="flex w-full items-center justify-between">
          Home <Home />
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/blog" className="flex w-full items-center justify-between">
          Blog <Book />
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link
          href="/create"
          className="flex w-full items-center justify-between"
        >
          Create <Plus />
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

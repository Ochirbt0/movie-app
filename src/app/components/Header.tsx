import { ChevronDown, VectorSquare } from "lucide-react";
import { SearchButton } from "./SearchButton";
import Link from "next/link";
import { GenreList } from "./GenreList";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  return (
    <div className="h-14.75 flex justify-center items-center">
      <div className="flex w-7xl h-9 justify-between items-center">
        <Link href="/">
          <div className="flex space-x-2 justify-center items-center">
            <img src="/film.png" alt="" className="w-5 h-5" />
            <p className="text-indigo-700 font-bold text-base">Movie Z</p>
          </div>
        </Link>
        <div className="flex justify-center items-center space-x-3">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ChevronDown /> Genre
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <GenreList />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className=" w-94.75 md:block hidden">
            <SearchButton />
          </div>
        </div>
        <div className="w-9 h-9 flex border justify-center items-center rounded-md">
          <button>
            <img src="./moon.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

"use client";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { ChangeEvent, useState } from "react";
import { ArrowUpIcon, Loader, Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export const SearchButton = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, error } = useSWR(
    `${process.env.TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
    fetcher
  );
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  console.log(data);
  return (
    <div>
      <InputGroup>
        <InputGroupInput onChange={handleChange} placeholder="Search..." />
        <InputGroupAddon>
          {isLoading && <Loader />}
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

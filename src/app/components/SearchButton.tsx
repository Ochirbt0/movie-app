"use client";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { ChangeEvent, useState } from "react";
import { ArrowUpIcon, Loader, Search, Loader2Icon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import Link from "next/link";
import { SearchResult } from "./SearchResult";
import { useRouter } from "next/navigation";
import { stringify } from "querystring";
import { NoResult } from "./NoResult";

export const SearchButton = () => {
  const [searchValue, setSearchValue] = useState("");
  const { push } = useRouter();
  const { data, isLoading, error } = useSWR(
    `${process.env.TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
    fetcher
  );

  const searchedResults = data?.results || [];
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
    push(`?query=${event.target.value}`);
  };
  // console.log(searchedResults);
  return (
    <div>
      <InputGroup>
        <InputGroupInput
          onChange={handleChange}
          className="z-10"
          placeholder="Search..."
          value={searchValue}
        />

        {searchValue && (
          <SearchResult
            setSearchValue={setSearchValue}
            data={searchedResults}
            isLoading={isLoading}
            searchedResults={searchedResults}
            searchValue={searchValue}
          />
        )}
        <InputGroupAddon>
          {isLoading && <Loader />}
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

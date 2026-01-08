"use client";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { ChangeEvent, useCallback, useState } from "react";
import { Loader, Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchResult } from "./SearchResult";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchButton = () => {
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      console.log(name, value);
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const { data, isLoading, error } = useSWR(
    `${process.env.TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
    fetcher
  );

  const searchedResults = data?.results || [];
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    router.push(
      pathname + "?" + createQueryString("query", event.target.value)
    );
  };

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

"use client";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { LoadingSpinner } from "../../loading-spinner";
import { useClickOutside } from "@/hooks/use-click-outside";

interface SearchInputProps {
  isAuthenticated: boolean;
}

export const SearchInput = ({ isAuthenticated }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const results = useQuery(
    api.blogArticles.searchBlogArticles,
    open
      ? {
          searchTerm,
          limit: 5,
        }
      : "skip"
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim().length >= 2) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSearchTerm("");
  };
  const searchMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(searchMenuRef, () => setOpen(false));

  return (
    <div
      className={cn(
        "relative hidden",
        isAuthenticated
          ? "[@media(min-width:800px)]:block"
          : "[@media(min-width:875px)]:block"
      )}
      ref={searchMenuRef}
    >
      <div className="relative mr-2">
        <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for articles..."
          className="pl-8"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {open && (
        <div className="absolute top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 w-full">
          {!results ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <LoadingSpinner className="mr-1.5 size-4" color="foreground" />
              Searching...
            </div>
          ) : results.length ? (
            <div className="py-1">
              {results.map((blogArticle) => (
                <Link
                  className="flex flex-col gap-1 py-2 px-4 cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm "
                  href={`/blog/${blogArticle._id}`}
                  onClick={handleClose}
                  key={blogArticle._id}
                >
                  <p className="font-medium truncate">{blogArticle.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {blogArticle.content.substring(0, 60)}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="p-4 text-sm text-muted-foreground text-center">
              No results found!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeamsWithPagination } from "@/services/team";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Spinner from "@/components/Spinner";
import TeamCard from "@/components/TeamCard";
import Image from "next/image";

function Team() {
  const [paginationUrl, setPaginationUrl] = useState("/api/teams?user");
  const { data, isLoading } = useQuery({
    queryKey: ["teamsByUser", paginationUrl],
    queryFn: () => getTeamsWithPagination(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl md:text-4xl">Team</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-10">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {data?.data.data.teams.length === 0 ? (
              <div className="flex justify-center items-center gap-4 p-10">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Teams</h1>
              </div>
            ) : (
              <>
                {data?.data.data.teams.map((team, index) => (
                  <TeamCard key={index} team={team} />
                ))}
              </>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <div>
          <Pagination>
            <PaginationContent>
              {data?.data.meta.links.map((link, index) => (
                <div key={index}>
                  {link.label === "&laquo; Previous" && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          link.url && handlePaginationChange(link.url)
                        }
                      />
                    </PaginationItem>
                  )}
                  {link.label !== "&laquo; Previous" &&
                    link.label !== "Next &raquo;" && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() =>
                            link.url && handlePaginationChange(link.url)
                          }
                          isActive={link.active}
                        >
                          {link.label}
                        </PaginationLink>
                      </PaginationItem>
                    )}
                  {link.label === "Next &raquo;" && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          link.url && handlePaginationChange(link.url)
                        }
                      />
                    </PaginationItem>
                  )}
                </div>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Team;

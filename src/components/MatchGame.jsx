"use client";

import Image from "next/image";
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
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user";
import { getMatchGamesByUser } from "@/services/team";
import Spinner from "@/components/Spinner";
import MatchGameCard from "./MatchGameCard";
import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

function MatchGame() {
  const [refresh, setRefresh] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["matchGamesByUser"],
    queryFn: getMatchGamesByUser,
  });
  const { data: user } = useQuery({
    queryFn: getUser,
    queryKey: ["users"],
  });
  useEffect(() => {
    refetch();
  }, [refresh]);
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center gap-4">
          <CardTitle onClick={() => setRefresh(!refresh)}>
            Your Match Games
          </CardTitle>
          <button>
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      {isLoading ? (
        <div className="flex justify-center items-center p-10">
          <Spinner />
        </div>
      ) : (
        <>
          <CardContent>
            <div className="flex flex-col gap-4">
              {data.data.data.length === 0 ? (
                <div className="flex justify-center items-center gap-4 p-10">
                  <Image
                    src="/favicon.ico"
                    width={32}
                    height={32}
                    alt="tarang_icon"
                  />
                  <h1 className="text-2xl font-semibold">No Match Games</h1>
                </div>
              ) : (
                <>
                  {data.data.data.map((matchGame) => (
                    <MatchGameCard matchGame={matchGame} user={user} />
                  ))}
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <div>
              <Pagination>
                <PaginationContent>
                  {data.data.meta.links.map((link, index) => (
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
        </>
      )}
    </Card>
  );
}

export default MatchGame;

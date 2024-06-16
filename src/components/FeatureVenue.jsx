"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVenuesByType, getVenuesWithPagination } from "@/services/venue";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import VenueCard from "./VenueCard";

function FeatureVenue({ sport, pagination }) {
  if (sport !== 0 && pagination) {
    const [paginationUrl, setPaginationUrl] = useState(
      `/api/venues?type=${sport}`
    );
    const { data: venuesTest, isLoading } = useQuery({
      queryKey: ["venues", sport, paginationUrl],
      queryFn: () => getVenuesByType(paginationUrl),
    });
    const handlePaginationChange = (url) => {
      setPaginationUrl(url);
    };
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
        <h1 className="text-2xl font-semibold mb-4">Feature Venue</h1>
        <>
          {isLoading ? (
            <div className="flex justify-center items-center p-10">
              <Spinner />
            </div>
          ) : (
            <>
              {venuesTest.data.venues.length === 0 ? (
                <div className="flex justify-center items-center gap-4 p-10">
                  <Image
                    src="/favicon.ico"
                    width={32}
                    height={32}
                    alt="tarang_icon"
                  />
                  <h1 className="text-2xl font-semibold">No Venue</h1>
                </div>
              ) : (
                <>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
                    {venuesTest.data.venues.map((venue, index) => (
                      <VenueCard key={index} venue={venue} searchData="" />
                    ))}
                  </div>
                  <div className="flex justify-center md:justify-end items-center">
                    <div>
                      <Pagination className="mt-4">
                        <PaginationContent>
                          {venuesTest.meta.links.map((link, index) => (
                            <div key={index}>
                              {link.label === "&laquo; Previous" && (
                                <PaginationItem>
                                  <PaginationPrevious
                                    onClick={() =>
                                      link.url &&
                                      handlePaginationChange(link.url)
                                    }
                                  />
                                </PaginationItem>
                              )}
                              {link.label !== "&laquo; Previous" &&
                                link.label !== "Next &raquo;" && (
                                  <PaginationItem>
                                    <PaginationLink
                                      onClick={() =>
                                        link.url &&
                                        handlePaginationChange(link.url)
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
                                      link.url &&
                                      handlePaginationChange(link.url)
                                    }
                                  />
                                </PaginationItem>
                              )}
                            </div>
                          ))}
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      </div>
    );
  }
  const [paginationUrl, setPaginationUrl] = useState("/api/venues");
  const { data: venues, isLoading } = useQuery({
    queryKey: ["venues", paginationUrl],
    queryFn: () => getVenuesWithPagination(paginationUrl),
  });
  const handlePaginationChange = (url) => {
    setPaginationUrl(url);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
      <h1 className="text-2xl font-semibold mb-4">Feature Venue</h1>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center p-10">
            <Spinner />
          </div>
        ) : (
          <>
            {venues.data.data.venues.length === 0 ? (
              <div className="flex justify-center items-center gap-4 p-10">
                <Image
                  src="/favicon.ico"
                  width={32}
                  height={32}
                  alt="tarang_icon"
                />
                <h1 className="text-2xl font-semibold">No Venue</h1>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
                {venues.data.data.venues.map((venue, index) => (
                  <VenueCard key={index} venue={venue} searchData="" />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FeatureVenue;

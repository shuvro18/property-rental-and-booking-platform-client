"use client";

import { Pagination } from "@heroui/react";
import Link from "next/link";


export function PaginationBasic({ totalPage, currentPage, queryParams = {} }) {
    const page = Number(currentPage) || 1;
    const pages = Number(totalPage) || 1;
    if (pages <= 1) return null;

    const buildUrl = (targetPage) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value && key !== "page") {
                params.set(key, value);
            }
        });
        params.set("page", targetPage);
        return `/properties?${params.toString()}`;
    };

    const totalPages = [];
    for (let i = 1; i <= pages; i++) {
        totalPages.push(i);
    }
    
    return (
        <Pagination className="justify-center">
            <Pagination.Content>
                <Pagination.Item>
                    <Link href={buildUrl(Math.max(1, page - 1))}>
                        <Pagination.Previous isDisabled={page <= 1}>
                            <Pagination.PreviousIcon />
                            <span>Previous</span>
                        </Pagination.Previous>
                    </Link>
                </Pagination.Item>
                {totalPages.map(p => (
                    <Link href={buildUrl(p)} key={p}>
                        <Pagination.Item>
                            <Pagination.Link isActive={p === page}>
                                {p}
                            </Pagination.Link>
                        </Pagination.Item>
                    </Link>
                ))}
                <Pagination.Item>
                    <Link href={buildUrl(Math.min(pages, page + 1))}>
                        <Pagination.Next isDisabled={page >= pages}>
                            <span>Next</span>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Link>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    );
}
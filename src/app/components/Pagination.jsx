"use client";

import { Pagination } from "@heroui/react";
import Link from "next/link";


export function PaginationBasic({ totalPage, currentPage }) {

    const page = Number(currentPage)
    const pages = Number(totalPage);
    const totalPages = [];
    for (let i = 1; i <= pages; i++) {
        totalPages.push(i)
    }
    
    return (
        <Pagination className="justify-center">
            <Pagination.Content>
                <Pagination.Item>
                    <Link href={`/properties?page=${page - 1}`}>
                        <Pagination.Previous isDisabled={page === 1}>
                            <Pagination.PreviousIcon />
                            <span>Previous</span>
                        </Pagination.Previous>
                    </Link>
                </Pagination.Item>
                {totalPages.map(p => (
                    <Link href={`/properties?page=${p}`} key={p}>

                        <Pagination.Item >
                            <Pagination.Link isActive={p === page} >
                                {p}
                            </Pagination.Link>
                        </Pagination.Item>

                    </Link>
                ))

                }
                <Pagination.Item>
                    <Link href={`/properties?page=${page + 1}`}>
                        <Pagination.Next isDisabled={page === pages}>
                            <span>Next</span>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Link>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    );
}
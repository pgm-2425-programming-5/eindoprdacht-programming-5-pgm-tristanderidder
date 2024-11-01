"use client"
import React, { useState, useEffect } from "react";
import { StrapiUserT } from "../types/Strapi/User.d";
import { gql, request } from "graphql-request";

import { query } from "../graphql/queries";

async function fetchUser(): Promise<StrapiUserT> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const dataQuery = query;

  const response: { user: StrapiUserT } = await request(
    baseUrl + "/graphql",
    dataQuery
  );
  return response.user;
}

export default function User() {
    const [user, setUser] = useState<StrapiUserT | null>(null);
    
    useEffect(() => {
        async function getUser() {
        const fetchedUser = await fetchUser();
        setUser(fetchedUser);
        }
        getUser();
    }, []);
    
    return (
        <div>
        {user ? (
            <p>
            Logged in as {user.username} ({user.email})
            </p>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    );
}
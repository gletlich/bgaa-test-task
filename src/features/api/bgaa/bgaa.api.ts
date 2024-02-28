import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { BgaaResponse } from "../../../types/bgaa.types";

export const bgaaApi = createApi({
  reducerPath: "bgaaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://bgaa.by/" }),
  endpoints: (builder) => ({
    getData: builder.query<BgaaResponse, void>({
      query: () => "/test",
    }),
    saveChanges: builder.mutation({
      query: (groupsData) => ({
        url: "/test_result",
        method: "POST",
        body: groupsData,
      }),
    }),
  }),
});

export const { useGetDataQuery, useSaveChangesMutation } = bgaaApi;

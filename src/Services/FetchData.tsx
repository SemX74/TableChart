import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICertain, IList } from "./Interfaces";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://oril-coins-test.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    getDataList: builder.query<IList[], string>({
      query: () => `list`,
    }),
    getInfoById: builder.query<ICertain, string>({
      query: (id) => `item/${id}`,
    }),
  }),
});

export const { useGetDataListQuery, useGetInfoByIdQuery } = dataApi;

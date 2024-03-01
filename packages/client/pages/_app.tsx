import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import "../base.css";

const AppWrapper = (props: AppProps) => {
  const { Component  } = props;
  const { queries, ...pageProps } = props.pageProps;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const getLayout = (
    Component as unknown as { getLayout: Function }
  ).getLayout || ((page: any) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={queries}>
        <Toaster />
        {getLayout(<Component {...pageProps} />)}
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default AppWrapper;

import { AxiosError } from "axios";
import { QueryClient, UseQueryOptions, UseMutationOptions, DefaultOptions } from "react-query";
import { PromiseValue } from "type-fest";

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false
  }
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: Parameters<FnType>) => ReturnType<FnType>> = PromiseValue<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends (...args: Parameters<QueryFnType>) => ReturnType<QueryFnType>> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<MutationFnType extends (...args: Parameters<MutationFnType>) => ReturnType<MutationFnType>> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType> extends readonly [infer P1] ? P1 : never
  >;

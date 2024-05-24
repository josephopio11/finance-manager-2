import { client } from "@/lib/hono";
import { convertAmountFromMilliUnits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.summary.$get({
        query: { from, to, accountId },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch summary");
      }

      const { data } = await res.json();
      return {
        ...data,
        incomeAmount: convertAmountFromMilliUnits(data.incomeAmount),
        expenseAmount: convertAmountFromMilliUnits(data.expenseAmount),
        remainingAmount: convertAmountFromMilliUnits(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMilliUnits(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMilliUnits(day.income),
          expense: convertAmountFromMilliUnits(day.expense),
        })),
      };
    },
  });

  return query;
};

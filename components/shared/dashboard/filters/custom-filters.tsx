import { AccountFilters } from "./account-filter";
import { DateFilter } from "./date-filter";

export const CustomFilters = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
      <AccountFilters />
      <DateFilter />
    </div>
  );
};

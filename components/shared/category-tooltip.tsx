import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export const CategoryTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  const name = payload[0].payload.name;
  const value = payload[0].value;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm py-2 px-3 bg-muted text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-destructive rounded-full" />
            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>
          <p className="text-sm text-right text-destructive font-medium">
            {formatCurrency(value)}
          </p>
        </div>
      </div>
    </div>
  );
};

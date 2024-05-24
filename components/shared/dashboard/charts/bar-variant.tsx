import { CustomTooltip } from "@/components/shared/custom-tooltip";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

type Props = {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
};

export const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "MMM dd")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar className="drop-shadow-sm" dataKey="income" fill="#3d82f6" />
        <Bar className="drop-shadow-sm" dataKey="expense" fill="#f43f5e" />
      </BarChart>
    </ResponsiveContainer>
  );
};

import { CustomTooltip } from "@/components/shared/custom-tooltip";
import { format } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart,
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

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data}>
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
        <Line
          dot={false}
          className="drop-shadow-sm"
          dataKey="income"
          stroke="#3d82f6"
          strokeWidth={2}
        />
        <Line
          dot={false}
          className="drop-shadow-sm"
          dataKey="expense"
          strokeWidth={2}
          stroke="#f43f5e"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

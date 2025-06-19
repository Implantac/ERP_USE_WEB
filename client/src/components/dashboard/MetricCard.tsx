import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
    label: string;
  };
  icon: LucideIcon;
  color: "success" | "warning" | "danger" | "info" | "purple";
}

const colorClasses = {
  success: {
    bg: "bg-success/10",
    text: "text-success",
    icon: "text-success",
  },
  warning: {
    bg: "bg-warning/10", 
    text: "text-warning",
    icon: "text-warning",
  },
  danger: {
    bg: "bg-danger/10",
    text: "text-danger", 
    icon: "text-danger",
  },
  info: {
    bg: "bg-info/10",
    text: "text-info",
    icon: "text-info",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600", 
    icon: "text-purple-600",
  },
};

export default function MetricCard({ title, value, change, icon: Icon, color }: MetricCardProps) {
  const colors = colorClasses[color];
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className={cn("text-sm mt-1", change.positive ? "text-success" : "text-danger")}>
                <span className="inline-flex items-center">
                  {change.positive ? "+" : ""}{change.value} {change.label}
                </span>
              </p>
            )}
          </div>
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colors.bg)}>
            <Icon className={cn("w-6 h-6", colors.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

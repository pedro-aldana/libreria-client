import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  );
}

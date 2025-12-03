import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Stat = {
  label: string;
  value: number;
};

interface ApplicationsSummaryProps {
  stats: Stat[];
}

function ApplicationsSummary({ stats }: ApplicationsSummaryProps) {
  return (
    <div className='grid grid-cols-5 gap-4'>
      {stats.map((stat: Stat) => (
        <Card key={stat.label} className='shadow-sm'>
          <CardHeader>
            <CardTitle className='text-sm'>{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold'>{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ApplicationsSummary;

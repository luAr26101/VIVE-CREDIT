import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Application = {
  id: string;
  name: string;
  type: string;
  amount: number;
  period: string;
  status: string;
  date: string;
};

interface ApplicationsTableProps {
  applications: Application[];
}

function ApplicationsTable({ applications }: ApplicationsTableProps) {
  return (
    <Table className='mt-10'>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application: Application) => (
          <TableRow key={application.id}>
            <TableCell>{application.id}</TableCell>
            <TableCell>{application.name}</TableCell>
            <TableCell>{application.type}</TableCell>
            <TableCell>{application.amount}</TableCell>
            <TableCell>{application.period}</TableCell>
            <TableCell>{application.status}</TableCell>
            <TableCell>{application.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ApplicationsTable;

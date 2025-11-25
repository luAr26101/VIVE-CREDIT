import ApplicationsSummary from "./components/applications/ApplicationsSummary";
import ApplicationsTable from "./components/applications/ApplicationsTable";
import ApplicationsTitle from "./components/applications/ApplicationsTitle";
import DashboardLayout from "./components/layout/DashboardLayout";

const stats = [
  { label: "Total Applications", value: 10 },
  { label: "Pending", value: 3 },
  { label: "Approved", value: 5 },
  { label: "Rejected", value: 2 },
  { label: "Total Amount", value: 100000 },
];

const applications = [
  {
    id: "1",
    name: "Alice Smith",
    type: "Personal loan",
    amount: 5000,
    period: "24 months",
    status: "Pending",
    date: "12/02/2025",
  },
  {
    id: "2",
    name: "John Smith",
    type: "Refinancing loan",
    amount: 10000,
    period: "30 months",
    status: "Approved",
    date: "12/03/2025",
  },
];

function ApplicationsPage() {
  return (
    <DashboardLayout>
      <ApplicationsTitle />
      <ApplicationsSummary stats={stats} />
      <ApplicationsTable applications={applications} />
    </DashboardLayout>
  );
}

export default ApplicationsPage;

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold">{label}:</p>
      <p className="text-gray-700 dark:text-gray-300">{value}</p>
    </div>
  );
}

export default SummaryField;

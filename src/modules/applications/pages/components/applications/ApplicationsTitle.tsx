import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ApplicationsTitle() {
  const navigate = useNavigate();
  return (
    <div className='mb-10 flex items-center justify-between'>
      <div>
        <h1 className='text-3xl font-bold'>Applications</h1>
        <h2 className='text-sm text-gray-500'>
          Here you can find all the applications made.
        </h2>
      </div>
      <Button variant='outline' onClick={() => navigate("/applications/new")}>
        New Application +
      </Button>
    </div>
  );
}

export default ApplicationsTitle;

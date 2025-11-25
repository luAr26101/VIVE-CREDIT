import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function Header() {
  return (
    <header className='flex items-center justify-between bg-white border-b p-4'>
      <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
        Vive Credit
      </div>
      <div className='flex items-center gap-3'>
        <span className='text-sm'>Sirb Raul</span>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default Header;

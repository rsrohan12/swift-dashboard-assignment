import { Link } from 'react-router-dom';
import { useFirstUser } from '@/hooks/useUsers';

const Header = () => {
  const { data: user } = useFirstUser();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-primary text-primary-foreground h-14 flex items-center justify-between px-6 shadow-md">
      <Link to="/" className="flex items-center gap-1 font-bold text-lg">
        <span className="bg-accent text-accent-foreground px-1.5 py-0.5 rounded text-sm font-bold" style={{ backgroundColor: 'hsl(142, 76%, 36%)' }}>S</span>
        <span>WIFT</span>
      </Link>

      {user && (
        <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center text-sm font-medium">
            {getInitials(user.name)}
          </div>
          <span className="hidden sm:inline">{user.name}</span>
        </Link>
      )}
    </header>
  );
};

export default Header;

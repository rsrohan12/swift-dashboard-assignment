import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFirstUser } from '@/hooks/useUsers';
import Header from '@/components/Header';

const Profile = () => {
  const { data: user, isLoading } = useFirstUser();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatAddress = (address: NonNullable<typeof user>['address'] | undefined) => {
    if (!address) return '';
    return `${address.street}, ${address.suite}, ${address.city} ${address.zipcode}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-muted rounded mb-6" />
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="h-24 w-24 bg-muted rounded-full mb-4" />
              <div className="h-6 w-32 bg-muted rounded mb-2" />
              <div className="h-4 w-48 bg-muted rounded" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-muted-foreground">User not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button & Title */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-xl font-semibold">Welcome, {user.name}</span>
        </Link>

        {/* Profile Card */}
        <div className="bg-card rounded-lg border border-border p-6 sm:p-8">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold text-muted-foreground">
              {getInitials(user.name)}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">User ID</label>
              <div className="bg-muted/50 rounded-lg px-4 py-3 text-foreground">
                {user.id}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1">Name</label>
              <div className="bg-muted/50 rounded-lg px-4 py-3 text-foreground">
                {user.name}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1">Email ID</label>
              <div className="bg-muted/50 rounded-lg px-4 py-3 text-foreground">
                {user.email}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-1">Address</label>
              <div className="bg-muted/50 rounded-lg px-4 py-3 text-foreground truncate" title={formatAddress(user.address)}>
                {formatAddress(user.address)}
              </div>
            </div>

            <div className="sm:col-span-2 sm:w-1/2">
              <label className="text-sm text-muted-foreground block mb-1">Phone</label>
              <div className="bg-muted/50 rounded-lg px-4 py-3 text-foreground">
                {user.phone}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const roles = [
  'Sales Specialist',
  'Logistics Coordinator',
  'Accountant',
  'Manager',
];

const permissions = [
  'Create Quotes',
  'Approve Quotes',
  'View Finance',
  'Manage Fleet',
  'Manage Drivers',
  'Manage Vendors',
  'View Reports',
  'Manage Settings',
];

const rolePermissions: Record<string, string[]> = {
  'Sales Specialist': ['Create Quotes', 'View Reports'],
  'Logistics Coordinator': ['Create Quotes', 'Manage Fleet', 'Manage Drivers', 'View Reports'],
  Accountant: ['View Finance', 'View Reports'],
  Manager: permissions,
};

export function AdminPage() {
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">
          System settings and user management
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="minMargin">Minimum Margin % for Approval</Label>
              <Input id="minMargin" type="number" defaultValue="12" />
              <p className="text-xs text-muted-foreground">
                Quotes below this margin will require manager approval
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" defaultValue="KZT (₸)" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">Distance Unit</Label>
              <Input id="distance" defaultValue="Kilometers (km)" disabled />
            </div>
            <Button onClick={handleSaveSettings} className="w-full">
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role} className="border-b border-border pb-4 last:border-0">
                  <div className="font-medium mb-2">{role}</div>
                  <div className="flex flex-wrap gap-2">
                    {rolePermissions[role].map((permission) => (
                      <Badge key={permission} variant="secondary">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Audit Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  user: 'Manager',
                  action: 'Approved Quote Q-2847',
                  time: '2025-10-06 14:32',
                },
                {
                  user: 'Sales Specialist',
                  action: 'Created Quote Q-2850',
                  time: '2025-10-06 13:15',
                },
                {
                  user: 'Logistics Coordinator',
                  action: 'Updated Shipment S-1023 status',
                  time: '2025-10-06 11:48',
                },
                {
                  user: 'Accountant',
                  action: 'Marked payout done for S-1025',
                  time: '2025-10-06 09:22',
                },
              ].map((log, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-md bg-secondary text-sm"
                >
                  <div>
                    <span className="font-medium">{log.user}</span>
                    <span className="text-muted-foreground"> — {log.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

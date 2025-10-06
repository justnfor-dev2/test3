import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

const mockDrivers = [
  {
    id: '1',
    name: 'Nurlan Bekmuratov',
    phone: '+7 701 234 5678',
    license: 'CE',
    payPerKm: 28,
    currentAssignment: 'S-1023',
    distanceToday: 450,
    earningsToday: 12600,
    earningsMTD: 68400,
  },
  {
    id: '2',
    name: 'Aidar Karimov',
    phone: '+7 702 345 6789',
    license: 'CE',
    payPerKm: 30,
    currentAssignment: null,
    distanceToday: 0,
    earningsToday: 0,
    earningsMTD: 72000,
  },
  {
    id: '3',
    name: 'Damir Sultanov',
    phone: '+7 705 456 7890',
    license: 'C',
    payPerKm: 25,
    currentAssignment: 'S-1025',
    distanceToday: 680,
    earningsToday: 17000,
    earningsMTD: 58750,
  },
  {
    id: '4',
    name: 'Yerlan Omarov',
    phone: '+7 707 567 8901',
    license: 'CE',
    payPerKm: 32,
    currentAssignment: null,
    distanceToday: 0,
    earningsToday: 0,
    earningsMTD: 83200,
  },
];

export function DriversPage() {
  const [open, setOpen] = useState(false);

  const handleAddDriver = () => {
    toast.success('Driver added successfully');
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Drivers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage drivers and track earnings
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
              <DialogDescription>Enter driver information and pay rate</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Nurlan Bekmuratov" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+7 701 234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Class</Label>
                  <Input id="license" placeholder="CE" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pay">Pay per km (₸)</Label>
                <Input id="pay" type="number" placeholder="28" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDriver}>Add Driver</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  License
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Phone
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Current Assignment
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground">
                  Pay per km
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground">
                  Distance Today
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground">
                  Earnings Today
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground">
                  Earnings MTD
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockDrivers.map((driver) => (
                <tr key={driver.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-3 py-3 text-sm font-medium">{driver.name}</td>
                  <td className="px-3 py-3">
                    <Badge variant="outline">{driver.license}</Badge>
                  </td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{driver.phone}</td>
                  <td className="px-3 py-3 text-sm">
                    {driver.currentAssignment ? (
                      <Badge>{driver.currentAssignment}</Badge>
                    ) : (
                      <span className="text-muted-foreground">Available</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-sm text-right font-medium">
                    ₸{driver.payPerKm}
                  </td>
                  <td className="px-3 py-3 text-sm text-right">{driver.distanceToday} km</td>
                  <td className="px-3 py-3 text-sm text-right font-medium">
                    ₸{driver.earningsToday.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 text-sm text-right font-semibold">
                    ₸{driver.earningsMTD.toLocaleString()}
                  </td>
                  <td className="px-3 py-3">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

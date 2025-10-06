import { useState } from 'react';
import { Plus, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

const mockVehicles = {
  Idle: [
    { id: '1', plate: 'KZ-678-CD', type: 'Tent', capacity: 20, lastService: '2025-09-15' },
    { id: '2', plate: 'KZ-892-EF', type: 'Reefer', capacity: 18, lastService: '2025-09-20' },
    { id: '3', plate: 'KZ-234-GH', type: 'Tent', capacity: 22, lastService: '2025-09-18' },
  ],
  'En-route': [
    {
      id: '4',
      plate: 'KZ-445-AB',
      type: 'Tent',
      capacity: 20,
      assignment: 'S-1023',
      lastService: '2025-09-10',
    },
    {
      id: '5',
      plate: 'KZ-567-IJ',
      type: 'Reefer',
      capacity: 16,
      assignment: 'S-1021',
      lastService: '2025-09-12',
    },
  ],
  Maintenance: [
    {
      id: '6',
      plate: 'KZ-789-KL',
      type: 'Tent',
      capacity: 20,
      nextService: '2025-10-08',
      lastService: '2025-08-25',
    },
  ],
};

export function FleetPage() {
  const [open, setOpen] = useState(false);

  const handleAddVehicle = () => {
    toast.success('Vehicle added successfully');
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Fleet</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage vehicles and maintenance</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>Enter vehicle details and specifications</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="plate">License Plate</Label>
                <Input id="plate" placeholder="KZ-123-AB" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tent">Tent</SelectItem>
                      <SelectItem value="Reefer">Reefer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity (tons)</Label>
                  <Input id="capacity" type="number" placeholder="20" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastService">Last Service Date</Label>
                <Input id="lastService" type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddVehicle}>Add Vehicle</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(mockVehicles).map(([status, vehicles]) => (
          <Card key={status}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                {status}
                <Badge variant="secondary">{vehicles.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">{vehicle.plate}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">
                        {vehicle.type} · {vehicle.capacity}t
                      </div>
                      {'assignment' in vehicle && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Shipment: {vehicle.assignment}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-2">
                        Service: {new Date(vehicle.lastService).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {vehicles.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No vehicles in {status.toLowerCase()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

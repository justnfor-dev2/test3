import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
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
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { PriceBreakdownBlock } from '../components/shared/price-block';
import { toast } from 'sonner';

const mockQuotes = [
  {
    id: 'Q-2847',
    setId: 'QS-1001',
    customer: 'Almaty Trade LLC',
    mode: 'Internal',
    route: 'Almaty → Astana',
    distance: 1200,
    price: 85000,
    cost: 77500,
    status: 'Proposed',
    eta: 2,
  },
  {
    id: 'Q-2848',
    setId: 'QS-1001',
    customer: 'Almaty Trade LLC',
    mode: 'Vendor',
    route: 'Almaty → Astana',
    distance: 1200,
    price: 82000,
    cost: 74000,
    status: 'Proposed',
    eta: 2,
  },
  {
    id: 'Q-2849',
    setId: 'QS-1002',
    customer: 'Shymkent Logistics',
    mode: 'Internal',
    route: 'Shymkent → Karaganda',
    distance: 1850,
    price: 125000,
    cost: 108000,
    status: 'Accepted',
    eta: 3,
  },
];

export function QuotesPage() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'Internal' | 'Vendor'>('Internal');

  const handleCreateQuote = () => {
    toast.success('Quote created successfully');
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Quotes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage pricing proposals for customers
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Quote</DialogTitle>
              <DialogDescription>
                Enter cargo details and pricing information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Almaty Trade LLC</SelectItem>
                      <SelectItem value="2">Shymkent Logistics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mode">Mode</Label>
                  <Select value={mode} onValueChange={(v) => setMode(v as any)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Internal">Internal</SelectItem>
                      <SelectItem value="Vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input id="origin" placeholder="Almaty" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" placeholder="Astana" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance (km)</Label>
                  <Input id="distance" type="number" placeholder="1200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo Type</Label>
                  <Input id="cargo" placeholder="Electronics" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirement">Requirement</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tent">Tent</SelectItem>
                      <SelectItem value="Reefer">Reefer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (tons)</Label>
                  <Input id="weight" type="number" placeholder="12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volume">Volume (m³)</Label>
                  <Input id="volume" type="number" placeholder="45" />
                </div>
              </div>

              {mode === 'Internal' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Vehicle</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">KZ-445-AB</SelectItem>
                        <SelectItem value="2">KZ-678-CD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver">Driver</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select driver" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Nurlan Bekmuratov</SelectItem>
                        <SelectItem value="2">Aidar Karimov</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Express Trans KZ</SelectItem>
                      <SelectItem value="2">Cargo Masters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Customer Price (₸)</Label>
                  <Input id="price" type="number" placeholder="85000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eta">ETA (days)</Label>
                  <Input id="eta" type="number" placeholder="2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Textarea id="note" placeholder="Additional information..." rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateQuote}>Create Quote</Button>
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
                  ID
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Set
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Mode
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Route
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground">
                  Distance
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Price
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockQuotes.map((quote) => {
                const pricePerKm = quote.price / quote.distance;
                const costPerKm = quote.cost / quote.distance;
                const margin = quote.price - quote.cost;
                const marginPct = (margin / quote.price) * 100;

                return (
                  <tr key={quote.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="px-3 py-3 text-sm font-medium">{quote.id}</td>
                    <td className="px-3 py-3 text-sm text-muted-foreground">{quote.setId}</td>
                    <td className="px-3 py-3 text-sm">{quote.customer}</td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant={quote.mode === 'Internal' ? 'default' : 'secondary'}>
                        {quote.mode}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-sm">{quote.route}</td>
                    <td className="px-3 py-3 text-sm text-right">{quote.distance} km</td>
                    <td className="px-3 py-3">
                      <PriceBreakdownBlock
                        customerPrice={quote.price}
                        pricePerKm={pricePerKm}
                        totalCost={quote.cost}
                        costPerKm={costPerKm}
                        marginAmount={margin}
                        marginPercent={marginPct}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant={
                          quote.status === 'Accepted'
                            ? 'default'
                            : quote.status === 'Proposed'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {quote.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

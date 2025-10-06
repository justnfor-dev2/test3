import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { PriceBreakdownBlock } from '../components/shared/price-block';

const mockShipments = [
  {
    id: 'S-1023',
    quoteId: 'Q-2849',
    customer: 'Shymkent Logistics',
    status: 'In Transit',
    route: 'Shymkent → Karaganda',
    distance: 1850,
    mode: 'Internal',
    vehicle: 'KZ-445-AB',
    driver: 'Nurlan Bekmuratov',
    pickup: '2025-10-04 08:00',
    eta: '2025-10-07 16:00',
    price: 125000,
    cost: 108000,
  },
  {
    id: 'S-1024',
    quoteId: 'Q-2845',
    customer: 'Almaty Trade LLC',
    status: 'Pending Pickup',
    route: 'Almaty → Aktau',
    distance: 2400,
    mode: 'Vendor',
    vendor: 'Express Trans KZ',
    pickup: '2025-10-07 06:00',
    eta: '2025-10-11 18:00',
    price: 168000,
    cost: 152000,
  },
  {
    id: 'S-1025',
    quoteId: 'Q-2841',
    customer: 'Karaganda Industrial',
    status: 'Delivered',
    route: 'Astana → Pavlodar',
    distance: 450,
    mode: 'Internal',
    vehicle: 'KZ-678-CD',
    driver: 'Aidar Karimov',
    pickup: '2025-10-01 07:00',
    eta: '2025-10-01 19:00',
    price: 38000,
    cost: 32500,
  },
];

const statusColors: Record<string, string> = {
  'Pending Pickup': 'secondary',
  'In Transit': 'default',
  Delivered: 'outline',
  Cancelled: 'destructive',
};

export function ShipmentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Shipments</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track active and completed deliveries
        </p>
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
                  Customer
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Route
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Assignment
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Pickup
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Finance
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockShipments.map((shipment) => {
                const pricePerKm = shipment.price / shipment.distance;
                const costPerKm = shipment.cost / shipment.distance;
                const margin = shipment.price - shipment.cost;
                const marginPct = (margin / shipment.price) * 100;

                return (
                  <tr key={shipment.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="px-3 py-3 text-sm font-medium">{shipment.id}</td>
                    <td className="px-3 py-3 text-sm">{shipment.customer}</td>
                    <td className="px-3 py-3">
                      <Badge variant={statusColors[shipment.status] as any}>
                        {shipment.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <div>{shipment.route}</div>
                      <div className="text-xs text-muted-foreground">{shipment.distance} km</div>
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <Badge variant={shipment.mode === 'Internal' ? 'default' : 'secondary'}>
                        {shipment.mode}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {shipment.mode === 'Internal'
                          ? `${shipment.vehicle} · ${shipment.driver}`
                          : shipment.vendor}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm">
                      <div className="text-xs text-muted-foreground">Pickup</div>
                      <div className="font-medium">
                        {new Date(shipment.pickup).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">ETA</div>
                      <div className="font-medium">
                        {new Date(shipment.eta).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <PriceBreakdownBlock
                        customerPrice={shipment.price}
                        pricePerKm={pricePerKm}
                        totalCost={shipment.cost}
                        costPerKm={costPerKm}
                        marginAmount={margin}
                        marginPercent={marginPct}
                        className="flex-col gap-2"
                      />
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

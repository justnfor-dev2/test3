import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const mockVendors = [
  {
    id: '1',
    name: 'Express Trans KZ',
    contact: 'Marat Asanov',
    phone: '+7 727 123 4567',
    email: 'info@expresstrans.kz',
    avgRatePerKm: 63,
    terms: 'Net 30',
    activeShipments: 2,
  },
  {
    id: '2',
    name: 'Cargo Masters',
    contact: 'Bolat Serikbayev',
    phone: '+7 717 234 5678',
    email: 'cargo@masters.kz',
    avgRatePerKm: 58,
    terms: 'Net 15',
    activeShipments: 0,
  },
  {
    id: '3',
    name: 'Swift Logistics',
    contact: 'Aida Tulegenova',
    phone: '+7 747 345 6789',
    email: 'contact@swift.kz',
    avgRatePerKm: 65,
    terms: 'Net 30',
    activeShipments: 1,
  },
];

export function VendorsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Vendors</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage vendor partnerships and contracts
          </p>
        </div>
        <Button>Add Vendor</Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Vendor Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Contact
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Phone
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Email
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-muted-foreground">
                  Avg Rate/km
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Payment Terms
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Active Shipments
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockVendors.map((vendor) => (
                <tr key={vendor.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="px-3 py-3 text-sm font-medium">{vendor.name}</td>
                  <td className="px-3 py-3 text-sm">{vendor.contact}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{vendor.phone}</td>
                  <td className="px-3 py-3 text-sm text-muted-foreground">{vendor.email}</td>
                  <td className="px-3 py-3 text-sm text-right font-medium">
                    ₸{vendor.avgRatePerKm}
                  </td>
                  <td className="px-3 py-3 text-sm">{vendor.terms}</td>
                  <td className="px-3 py-3">
                    {vendor.activeShipments > 0 ? (
                      <Badge>{vendor.activeShipments}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">None</span>
                    )}
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

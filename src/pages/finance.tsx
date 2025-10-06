import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { PriceBreakdownBlock } from '../components/shared/price-block';
import { toast } from 'sonner';

const mockFinanceData = [
  {
    id: 'S-1023',
    customer: 'Shymkent Logistics',
    coordinator: 'Asel Nurbekova',
    date: '2025-10-04',
    vehicle: 'KZ-445-AB',
    distance: 1850,
    price: 125000,
    cost: 108000,
    invoiceSent: true,
    payoutDone: false,
  },
  {
    id: 'S-1024',
    customer: 'Almaty Trade LLC',
    coordinator: 'Bakyt Zhumabekov',
    date: '2025-10-05',
    vendor: 'Express Trans KZ',
    distance: 2400,
    price: 168000,
    cost: 152000,
    invoiceSent: false,
    payoutDone: false,
  },
  {
    id: 'S-1025',
    customer: 'Karaganda Industrial',
    coordinator: 'Asel Nurbekova',
    date: '2025-10-01',
    vehicle: 'KZ-678-CD',
    distance: 450,
    price: 38000,
    cost: 32500,
    invoiceSent: true,
    payoutDone: true,
  },
];

const kpis = [
  { label: 'Total Revenue', value: '₸331,000' },
  { label: 'Total Cost', value: '₸292,500' },
  { label: 'Avg Margin %', value: '11.6%' },
  { label: 'Unpaid Vendor Payouts', value: '₸152,000' },
];

export function FinancePage() {
  const handleExport = () => {
    toast.success('Exporting finance data to CSV');
  };

  const handleMarkPayout = (id: string) => {
    toast.success(`Payout marked as done for ${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Finance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Revenue, costs, and margin analysis
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Shipment
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Coordinator
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Date
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Assignment
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">
                  Finance
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
              {mockFinanceData.map((record) => {
                const pricePerKm = record.price / record.distance;
                const costPerKm = record.cost / record.distance;
                const margin = record.price - record.cost;
                const marginPct = (margin / record.price) * 100;

                return (
                  <tr key={record.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="px-3 py-3 text-sm font-medium">{record.id}</td>
                    <td className="px-3 py-3 text-sm">{record.customer}</td>
                    <td className="px-3 py-3 text-sm text-muted-foreground">
                      {record.coordinator}
                    </td>
                    <td className="px-3 py-3 text-sm">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-3 text-sm">
                      {'vehicle' in record ? record.vehicle : record.vendor}
                    </td>
                    <td className="px-3 py-3">
                      <PriceBreakdownBlock
                        customerPrice={record.price}
                        pricePerKm={pricePerKm}
                        totalCost={record.cost}
                        costPerKm={costPerKm}
                        marginAmount={margin}
                        marginPercent={marginPct}
                        className="flex-col gap-2"
                      />
                    </td>
                    <td className="px-3 py-3 text-xs space-y-1">
                      <div className={record.invoiceSent ? 'text-success' : 'text-warning'}>
                        {record.invoiceSent ? '✓ Invoice sent' : '○ Invoice pending'}
                      </div>
                      {('vendor' in record && (
                        <div className={record.payoutDone ? 'text-success' : 'text-warning'}>
                          {record.payoutDone ? '✓ Payout done' : '○ Payout pending'}
                        </div>
                      )) || <div className="text-muted-foreground">—</div>}
                    </td>
                    <td className="px-3 py-3">
                      {'vendor' in record && !record.payoutDone && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkPayout(record.id)}
                        >
                          Mark Paid
                        </Button>
                      )}
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

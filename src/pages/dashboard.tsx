import { Package, Truck, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const kpis = [
  { label: 'Active Shipments', value: '24', icon: Package, trend: '+12%' },
  { label: 'Idle Vehicles', value: '8', icon: Truck, trend: '-3%' },
  { label: 'Quotes Awaiting', value: '15', icon: FileText, trend: '+5%' },
  { label: "Today's Pickups", value: '6', icon: Calendar, trend: '' },
  { label: 'MTD Margin', value: '$48,250', icon: TrendingUp, trend: '+18%' },
];

const needsAttention = [
  { title: 'Quote #Q-2847 has 8.5% margin', type: 'warning' },
  { title: 'Vehicle KZ-445-AB needs maintenance', type: 'warning' },
  { title: 'Driver license expires in 5 days', type: 'warning' },
  { title: 'Missing docs for Shipment #S-1023', type: 'error' },
];

export function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of all logistics operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              {kpi.trend && (
                <p className="text-xs text-muted-foreground mt-1">{kpi.trend} from last month</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Margin Trend (MTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-sm text-muted-foreground">
              Chart placeholder
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {needsAttention.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-md bg-secondary text-sm"
                >
                  <div
                    className={`mt-0.5 h-2 w-2 rounded-full ${
                      item.type === 'error' ? 'bg-destructive' : 'bg-warning'
                    }`}
                  />
                  <span className="flex-1">{item.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

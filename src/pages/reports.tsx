import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Analytics and performance insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Profitability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
              Report placeholder
            </div>
            <Button className="w-full mt-4" variant="outline">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
              Report placeholder
            </div>
            <Button className="w-full mt-4" variant="outline">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>On-time Delivery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
              Report placeholder
            </div>
            <Button className="w-full mt-4" variant="outline">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coordinator Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
              Report placeholder
            </div>
            <Button className="w-full mt-4" variant="outline">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

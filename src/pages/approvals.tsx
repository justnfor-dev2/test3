import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { PriceBreakdownBlock } from '../components/shared/price-block';
import { toast } from 'sonner';
import { Check, X, CircleAlert as AlertCircle } from 'lucide-react';

const mockApprovalSets = [
  {
    setId: 'QS-1001',
    customer: 'Almaty Trade LLC',
    route: 'Almaty → Astana',
    distance: 1200,
    quotes: [
      {
        id: 'Q-2847',
        mode: 'Internal',
        vehicle: 'KZ-445-AB',
        driver: 'Nurlan Bekmuratov',
        price: 85000,
        cost: 77500,
        eta: 2,
        note: 'Direct route via M-36',
      },
      {
        id: 'Q-2848',
        mode: 'Vendor',
        vendor: 'Express Trans KZ',
        price: 82000,
        cost: 74000,
        eta: 2,
        note: 'Vendor has good track record',
      },
    ],
  },
  {
    setId: 'QS-1003',
    customer: 'Karaganda Industrial',
    route: 'Aktobe → Kostanay',
    distance: 890,
    quotes: [
      {
        id: 'Q-2850',
        mode: 'Internal',
        vehicle: 'KZ-678-CD',
        driver: 'Aidar Karimov',
        price: 62000,
        cost: 54500,
        eta: 1,
        note: 'Express delivery requested',
      },
    ],
  },
];

export function ApprovalsPage() {
  const handleApprove = (quoteId: string) => {
    toast.success(`Quote ${quoteId} approved. Shipment created.`);
  };

  const handleDecline = (quoteId: string) => {
    toast.info(`Quote ${quoteId} declined`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Approvals</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review and approve quotes with low margins
        </p>
      </div>

      <div className="space-y-6">
        {mockApprovalSets.map((set) => (
          <Card key={set.setId}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">
                    Quote Set {set.setId} — {set.customer}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {set.route} · {set.distance} km
                  </p>
                </div>
                {set.quotes.length > 1 && (
                  <Badge variant="secondary">{set.quotes.length} alternatives</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {set.quotes.map((quote) => {
                  const pricePerKm = quote.price / set.distance;
                  const costPerKm = quote.cost / set.distance;
                  const margin = quote.price - quote.cost;
                  const marginPct = (margin / quote.price) * 100;
                  const needsAttention = marginPct < 12;

                  return (
                    <Card key={quote.id} className="relative">
                      {needsAttention && (
                        <div className="absolute top-3 right-3">
                          <AlertCircle className="h-4 w-4 text-warning" />
                        </div>
                      )}
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{quote.id}</div>
                            <Badge
                              variant={quote.mode === 'Internal' ? 'default' : 'secondary'}
                              className="mt-1"
                            >
                              {quote.mode}
                            </Badge>
                          </div>
                          <div className="text-right text-sm">
                            <div className="text-muted-foreground">ETA</div>
                            <div className="font-semibold">{quote.eta} days</div>
                          </div>
                        </div>

                        {quote.mode === 'Internal' ? (
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Vehicle:</span>
                              <span className="font-medium">{quote.vehicle}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Driver:</span>
                              <span className="font-medium">{quote.driver}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Vendor:</span>
                              <span className="font-medium">{quote.vendor}</span>
                            </div>
                          </div>
                        )}

                        <div className="pt-2 border-t border-border">
                          <PriceBreakdownBlock
                            customerPrice={quote.price}
                            pricePerKm={pricePerKm}
                            totalCost={quote.cost}
                            costPerKm={costPerKm}
                            marginAmount={margin}
                            marginPercent={marginPct}
                            className="flex-col gap-3"
                          />
                        </div>

                        {quote.note && (
                          <div className="text-sm text-muted-foreground border-t border-border pt-3">
                            {quote.note}
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleApprove(quote.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleDecline(quote.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockApprovalSets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Check className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No pending approvals</h3>
          <p className="text-sm text-muted-foreground mt-1">
            All quotes meet the minimum margin threshold
          </p>
        </div>
      )}
    </div>
  );
}

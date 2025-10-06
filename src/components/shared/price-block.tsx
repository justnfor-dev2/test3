import { cn } from '../../lib/utils';

interface PriceBlockProps {
  label: string;
  amount: number;
  subLabel: string;
  subValue: string;
  variant?: 'default' | 'success' | 'warning';
  className?: string;
}

export function PriceBlock({
  label,
  amount,
  subLabel,
  subValue,
  variant = 'default',
  className,
}: PriceBlockProps) {
  return (
    <div className={cn('space-y-0.5', className)}>
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span
          className={cn(
            'text-lg font-bold',
            variant === 'success' && 'text-success',
            variant === 'warning' && 'text-warning'
          )}
        >
          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
      <div className="text-xs text-muted-foreground opacity-60">
        {subLabel} {subValue}
      </div>
    </div>
  );
}

interface PriceBreakdownBlockProps {
  customerPrice: number;
  pricePerKm: number;
  totalCost: number;
  costPerKm: number;
  marginAmount: number;
  marginPercent: number;
  className?: string;
}

export function PriceBreakdownBlock({
  customerPrice,
  pricePerKm,
  totalCost,
  costPerKm,
  marginAmount,
  marginPercent,
  className,
}: PriceBreakdownBlockProps) {
  return (
    <div className={cn('flex gap-8', className)}>
      <PriceBlock
        label="Price (Customer)"
        amount={customerPrice}
        subLabel="Price per km"
        subValue={`$${pricePerKm.toFixed(2)}/km`}
      />
      <PriceBlock
        label="Cost (Total)"
        amount={totalCost}
        subLabel="Cost per km"
        subValue={`$${costPerKm.toFixed(2)}/km`}
      />
      <PriceBlock
        label="Margin"
        amount={marginAmount}
        subLabel="Margin %"
        subValue={`${marginPercent.toFixed(1)}%`}
        variant={marginPercent >= 12 ? 'success' : 'warning'}
      />
    </div>
  );
}

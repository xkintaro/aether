import type { ComponentProps } from "react";
import { cn } from "cn";
export function ExampleWrapper({className,...props}:ComponentProps<"div">) {
  return <div data-slot="example-wrapper" className={cn("grid w-full min-w-0 items-start gap-6 md:grid-cols-2",className)} {...props}/>;
}
export function Example({title,children,className,containerClassName,...props}:ComponentProps<"div"> & {title?:string;containerClassName?:string}) {
  return <section data-slot="example" className={cn("flex min-w-0 max-w-full flex-col gap-3 self-stretch",containerClassName)} {...props}>
    {title && <h2 className="font-heading text-sm font-medium text-muted-foreground">{title}</h2>}
    <div data-slot="example-content" className={cn("flex min-w-0 max-w-full flex-1 flex-col items-start gap-6 overflow-x-auto rounded-xl border border-border bg-card p-5 *:[div:not([class*='w-'])]:w-full text-card-foreground sm:p-8",className)}>{children}</div>
  </section>;
}

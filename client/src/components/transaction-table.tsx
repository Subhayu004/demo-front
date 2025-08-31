import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { type Transaction } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface TransactionTableProps {
  transactions: Transaction[];
}

const typeColors = {
  carbon_credit: "bg-secondary text-white",
  registry_update: "bg-primary text-white",
  smart_contract: "bg-purple-500 text-white",
};

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table data-testid="transaction-table">
        <TableHeader>
          <TableRow>
            <TableHead>Hash</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} data-testid={`transaction-row-${transaction.id}`}>
              <TableCell className="font-mono text-sm" data-testid={`transaction-hash-${transaction.id}`}>
                {transaction.hash}
              </TableCell>
              <TableCell>
                <Badge 
                  className={typeColors[transaction.type as keyof typeof typeColors]}
                  data-testid={`transaction-type-${transaction.id}`}
                >
                  {transaction.type.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm" data-testid={`transaction-from-${transaction.id}`}>
                {transaction.fromAddress}
              </TableCell>
              <TableCell className="font-mono text-sm" data-testid={`transaction-to-${transaction.id}`}>
                {transaction.toAddress}
              </TableCell>
              <TableCell data-testid={`transaction-value-${transaction.id}`}>
                {transaction.value || "-"}
              </TableCell>
              <TableCell className="text-muted-foreground" data-testid={`transaction-time-${transaction.id}`}>
                {formatDistanceToNow(new Date(transaction.timestamp!), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

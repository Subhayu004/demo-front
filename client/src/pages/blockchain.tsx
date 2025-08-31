import { useQuery } from "@tanstack/react-query";
import MetricCard from "@/components/metric-card";
import TransactionTable from "@/components/transaction-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type Transaction } from "@shared/schema";
import { Blocks, ArrowLeftRight, FileText, Gauge, Search } from "lucide-react";
import { useState } from "react";

export default function Blockchain() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: blockchainStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/analytics/blockchain"],
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  if (statsLoading || transactionsLoading) {
    return (
      <div className="space-y-6 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const filteredTransactions = transactions?.filter(tx => 
    !searchQuery || 
    tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.fromAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.toAddress.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6 fade-in" data-testid="blockchain-page">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Blockchain Explorer</h3>
          <p className="text-muted-foreground">Track transactions and smart contract activities</p>
        </div>
        <div className="flex space-x-3">
          <Input 
            type="text" 
            placeholder="Search by hash or address..." 
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="search-input"
          />
          <Button className="bg-primary text-primary-foreground hover:opacity-90" data-testid="button-search">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Blocks"
          value={blockchainStats?.totalBlocks?.toLocaleString() || "0"}
          icon={Blocks}
          iconColor="blockchain-block"
        />
        <MetricCard
          title="Transactions"
          value={blockchainStats?.totalTransactions?.toLocaleString() || "0"}
          icon={ArrowLeftRight}
          iconColor="bg-amber-500"
        />
        <MetricCard
          title="Smart Contracts"
          value={blockchainStats?.smartContracts?.toString() || "0"}
          icon={FileText}
          iconColor="bg-purple-500"
        />
        <MetricCard
          title="Network Hash Rate"
          value={blockchainStats?.networkHashRate || "0"}
          icon={Gauge}
          iconColor="bg-red-500"
          changeType="neutral"
        />
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionTable transactions={filteredTransactions} />
        </CardContent>
      </Card>

      {filteredTransactions.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground" data-testid="no-transactions-message">
            No transactions found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}

import TransactionForm from "@/components/TransactionForm";

import TransactionList from "@/components/TransactionList";

export default function Transactions() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <TransactionForm />
            <TransactionList />
        </main>
    )
}
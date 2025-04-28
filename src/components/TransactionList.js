'use client';

import { useEffect, useState } from 'react';

import { Button } from './ui/button';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  return (
    <ul className=''>
      {transactions.map((t) => (
        <li key={t._id} className='flex justify-between'>
          <p>{t.description}</p>
          <p>{t.amount}</p>
          <p>{new Date(t.date).toLocaleDateString()}</p>
          <Button onClick={() => handleDelete(t._id)}>Remove</Button>
        </li>
      ))}
    </ul>
  );
}
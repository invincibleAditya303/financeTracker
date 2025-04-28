"use client"

import { useState } from "react";

import  * as z from 'zod'

import { useForm } from "react-hook-form";

import {zodResolver} from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


const formSchema = z.object({
    amount: z.number().positive(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date',
      }),
    description: z.string().min(1)
})

export default function TransactionForm() {
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [show, setShow] = useState(false)


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: 0,
            date: '',
            description: ''
        }
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!amount || !date || !description) return

        const {amount, date,  description} = itemData

        try {
            const response = await fetch('/api/transactions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(itemData),
            });
            console.log(response)
      
            if (response.ok) {
              alert('Item added successfully');
              setAmount(0);
              setDate('');
              setDescription('')
            } else {
              alert('Failed to add item');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
          }
        

    }

    const onChangeDescription = event => {
        setDescription(event.target.value)
    }
    
    const onChangeDate = event => {
        setDate(event.target.value)
    }
    
    const onChangeAmount = event => {
        setAmount(event.target.value)
    }

    const onAddCategory = () => {
        setShow((prevState => !prevState))
    }
    const isFormShown = show ? 'flex' : 'hidden'

    return (
        <>
            <Button className="ml-auto" type="button" onClick={onAddCategory}>+ Add Category</Button>
            <Form {...form}>
                <form className={`${isFormShown} flex-col gap-4`} onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField control={form.control} name="amount" render={({field}) => {
                        return <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter amount" type="number" value={amount} onChange={onChangeAmount} {...field} />
                            </FormControl>
                        </FormItem>
                    }} />
                    <FormField control={form.control} name='date' render={({field}) => {
                        return <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter date' type='date' value={date} onChange={onChangeDate} {...field} />
                            </FormControl>
                        </FormItem>
                    }} />
                    <FormField control={form.control} name="description" render={({field}) => {
                        return <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter description" type="text" value={description} onChange={onChangeDescription} {...field} />
                            </FormControl>
                        </FormItem>
                    }} />
                    <Button type='submit'>Submit</Button>
                </form>
            </Form>
        </>
    )
}
import { NextResponse } from "next/server";

import { connectToDB }  from "@/utils/database";

import Transaction from "@/models/transcation";

export default async function GET() {
    try {
        await connectToDB()
        const transactions = await Transaction.find()
        return NextResponse.json(transactions)
    } catch (error) {
        return NextResponse.error()
    }
    
}

export default async function POST(request) {
    try {
        const {amount, date, description} = await request.json()
        await connectToDB()
        await Transaction.create({amount, date, description})
        return NextResponse.json('Transaction Added successfully', {status: 200})
    } catch (error) {
        return NextResponse.error()
    }
}

export default async  function PUT(request) {
    try {
        const {id, amount, date, description} = request.json()
        await connectToDB()
        const updateTransaction = await Transaction.findByIdAndUpdate(id, {amount, date, description}, {new: true})
        return NextResponse.json(updateTransaction)
    } catch (error) {
        return NextResponse.error()
    }
}

export default async function DELETE(request) {
    try {
        const {id} = request.json()
        await connectToDB()
        await Transaction.findByIdAndDelete(id)
        return NextResponse.json(null, {status: 200})
    } catch (error) {
        NextResponse.error()
    }
}
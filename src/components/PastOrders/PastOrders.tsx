import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import { Context } from "../../context/UserContext";
import { UserContextState } from '../../Types/User';
import { Receipt } from '../../Types/Receipt';
import ReceiptCard from '../ReceiptCard/ReceiptCard';
import NoPastOrder from '../NoPastOrder/NoPastOrder';
import styled from 'styled-components';

const Container = styled.div`
    width: 600px;
`

const PastOrders: React.FC = () => {
    const { currentUser } = useContext(Context) as UserContextState;
    const [receiptDate, setReceiptDate] = useState<Receipt[]>([]);
    
    async function getReceipts() {
        try {
            const { data } = await axios.get<Receipt[]>(
                "https://localhost:3000/receipts/readuser",
                {
                    headers: { "Access-Control-Allow-Origin": "*" },
                    params: { id: currentUser.userId },
                }
            );
            setReceiptDate(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error message:", error.message);
                return error.message;
            } else {
                console.log("Unexpected error:", error);
                return "An unexpected error occurred";
            }
        }
    }

    useEffect(() => {
        getReceipts();
    }, []);

    let user = localStorage.getItem("curUserI");

    return (
        <Container>
            {receiptDate.length !== 0 ? (
                receiptDate.map((receipt) => {
                    if (currentUser.userId.toString() === user) {
                        return (
                            <ReceiptCard
                                key={receipt.receiptNumber}
                                items={receipt.items}
                                userId={receipt.userId}
                                receiptNumber={receipt.receiptNumber}
                                dateTime={receipt.dateTime}
                                total={Math.round(receipt.total * 100) / 100}
                            />
                        );
                    }
                    return null;
                })
            ) : (
                <NoPastOrder />
            )}
        </Container>
    );
};

export default PastOrders;

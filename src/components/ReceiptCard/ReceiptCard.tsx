import React from 'react';
import { Receipt } from '../../Types/Receipt';
import styled, { keyframes} from 'styled-components';

const textAppear = keyframes`
    0% {opacity: 0%},
    100% {opacity: 100%}
`
const Container = styled.div`
    background-color: ${(props) => props.theme.body};
    animation: ${textAppear} 0.5s;
`
const Wrapper = styled.div`
    padding: 10px;
`
const Header = styled.div`
    padding: 10px;
    display: flex;
`
const Title = styled.h4`
    flex: 1;
`
const ReceiptDate = styled.h4`
`
const ReceiptBody = styled.div`
    display: flex;
    padding: 10px;
    font-size: 14px;
    background-color: ${(props) => props.theme.body};
`
const ItemsList = styled.ul`
    list-style-type: none;
    flex: 1;
`
const TotalPrice = styled.div`    
`
const ReceiptCard: React.FC<Receipt> = ({
    items,
    userId,
    receiptNumber,
    dateTime,
    total
}) => {
    return (
        <Container>
            <Wrapper>
                <Header>
                    <Title>Recibo ID: {receiptNumber}</Title>
                    <ReceiptDate>{dateTime}</ReceiptDate>
                </Header>
                <ReceiptBody>
                    <ItemsList>
                        {
                            items.map((items) => {
                                return (
                                    <li key={items.name}>{items.amount} X {items.name} </li>
                                )
                            })
                        }
                    </ItemsList>
                    <TotalPrice>
                        Precio Total: ${total}
                    </TotalPrice>
                </ReceiptBody>
            </Wrapper>
        </Container>
    );
};

export default ReceiptCard;
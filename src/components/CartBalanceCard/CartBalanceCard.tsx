import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { Context } from "../../context/ProductContext";
import { ProductContextState } from '../../Types/Product';
import CartCard from '../CartCard/CartCard';

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const Container = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
    background: white;
    margin-bottom: 50px;
    background-color: ${(props) => props.theme.body};
    animation: ${fadeIn} 1s;
`;

const CartBalance = styled.h3`
    padding: 3px;
    border-bottom: 1px solid ${(props) => props.theme.border};
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 10px;
    height: 80%;
`;

const BottomWrapper = styled.div`
    display: flex;
    justify-content: right;
    padding: 5px;
    border-bottom: 1px solid ${(props) => props.theme.border};
`;

const FinalWrapper = styled.div`
    display: flex;
    justify-content: right;
    padding-top: 15px;
    padding-inline: 5px;
`;

const Title = styled.div`
    flex: 1;
    padding-bottom: 5px;
    font-size: 14px;
`;

const DollarAmount = styled.div`
    font-size: 16px;
`;

const Total = styled.div`
    flex: 1;
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 5px;
`;

const CartBalanceCard: React.FC = () => {
    const { products, cartTotal } = useContext(Context) as ProductContextState;
    const subtotal = cartTotal(products);
    const taxes = subtotal * 0.19;
    const shipping = taxes > 950.30 ? 0 : 5;
    const total = (subtotal + taxes + shipping).toFixed(2);

    return (
        <Container>
            <CartBalance>Resumen de la Compra</CartBalance>
            {products.map((product, index) => (
                <CartCard
                    key={product.itemId}
                    itemId={product.itemId}
                    imageUrl={product.imageUrl}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    amount={product.amount} 
                />
            ))}
            <Wrapper>
                <BottomWrapper>
                    <Title>SubTotal</Title>
                    <DollarAmount>${subtotal.toFixed(2)}</DollarAmount>
                </BottomWrapper>
                <BottomWrapper>
                    <Title>Valor de Envío</Title>
                    <DollarAmount>${shipping.toFixed(2)}</DollarAmount>
                </BottomWrapper>
                <BottomWrapper>
                    <Title>Valor de Impuesto</Title>
                    <DollarAmount>${taxes.toFixed(2)}</DollarAmount>
                </BottomWrapper>
                <BottomWrapper>
                    <Title>Total</Title>
                    <DollarAmount>${total}</DollarAmount>
                </BottomWrapper>
                <FinalWrapper>
                    <Total>Total</Total>
                    <DollarAmount>${total}</DollarAmount>
                </FinalWrapper>
            </Wrapper>
        </Container>
    );
};

export default CartBalanceCard;

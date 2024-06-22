import styled from "styled-components";

const Container = styled.div`
    heigth: 30px;
    background-color: #6bc5f2;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    z-index: 2;
`

const Announcement = () => {
    return (
        <Container>
            ¡Promoción! ¡Compre ahora para obtener envío gratis en pedido superiores a 800.00$!
        </Container>
    )
}

export default Announcement;
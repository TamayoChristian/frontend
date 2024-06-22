import React, { useContext } from 'react';
import { Context as UserContext } from '../../context/UserContext';
import { Context as ProductContext } from '../../context/ProductContext';
import { UserContextState } from '../../Types/User';
import { ProductContextState } from '../../Types/Product';
import { useNavigate } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const textAppear = keyframes`
    0% {opacity: 0%},
    100% {opacity: 100%}
`
const Container = styled.div`
    margin-right: 20px;
`
const Greeting = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.body};
    padding: 30px 10px 30px;
    margin: 10px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
`
const GreetingIcon = styled.div`
    background-color: ${(props) => props.theme.altColor};
    padding: 25px;
    border-radius: 50%;
`
const GreetingInitials = styled.p`
    font-size: 3.5em;
    font-weight: bold;
    color: white;
`
const GreetingName = styled.div`
    padding: 10px;
`
const Hi = styled.p`
    font-size: 18px;
    letter-spacing: 2px;
`
const Name = styled.p`
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 3px;
`
const Tabss = styled.button`
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    display: flex;
    width: 350px;
    padding: 10px;
    margin: 10px;
    border: none;
    text-decoration: none;
    cursor: pointer;
    font-size: 16px;
    box-shadow: 0 10px 2px rgba(0, 0, 0, 0.2);
    /* animation: ${textAppear} 1s; */
    &: disabled {
        border-left: 5px solid #6bc5f2;    
    }
`
const TabText = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 30px;
`
const ProfileNavigation: React.FC = () => {
    const {
        currentTab,
        updateAccountTab,
        logoutUser,
        currentUser,
        updateCurrentUser,
    } = useContext(UserContext) as UserContextState;

    const navigate = useNavigate();
    const { removeAllProductsFromCart } = useContext(ProductContext) as ProductContextState;

    const handleTabClick = (e: React.MouseEvent) => {
        updateAccountTab();
    }
    const handleSignOut = () => {
        localStorage.clear();
        removeAllProductsFromCart();
        logoutUser();
        navigate('/');
    }

    return (
        <Container>
            <Greeting>
                <GreetingIcon>
                    <GreetingInitials>
                        {currentUser.firstName[0].toUpperCase()}
                        {currentUser.lastName[0].toUpperCase()}
                    </GreetingInitials>
                </GreetingIcon>
                <GreetingName>
                    <Hi>¡Hola,</Hi>
                    <Name>
                        {
                            currentUser.firstName[0].toUpperCase() + currentUser.firstName.slice(1).toLowerCase()
                        }
                        {" "}
                        {
                            currentUser.lastName[0].toUpperCase() + currentUser.lastName.slice(1).toLowerCase()
                        }
                    </Name>
                </GreetingName>
            </Greeting>
            <Tabss id="1" disabled={currentTab === "1"} onClick={handleTabClick}>
                <Person2OutlinedIcon style={{ fontSize: "2em" }} />
                <TabText>Dettales de la cuenta</TabText>
            </Tabss>
            <Tabss id="2" disabled={currentTab === "2"} onClick={handleTabClick}>
                <FormatListBulletedOutlinedIcon style={{ fontSize: "2em" }} />
                <TabText>Pedidos Anteriores</TabText>
            </Tabss>
            <Tabss id="3" disabled={currentTab === "3"} onClick={handleTabClick}>
                <LogoutOutlinedIcon style={{ fontSize: "2em" }} />
                <TabText>Desconectar</TabText>
            </Tabss>
        </Container>
    );
};

export default ProfileNavigation;
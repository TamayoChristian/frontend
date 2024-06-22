import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react'
import { Context } from "../context/UserContext";
import { User, UserContextState } from '../Types/User';
import styled, { keyframes } from 'styled-components';
import AccountDetails from '../components/AccountDetails/AccountDetails';
import PastOrders from '../components/PastOrders/PastOrders';
import ProfileNavigation from '../components/ProfileNavigation/ProfileNavigation';
import UpdateModal from '../components/UpdateModal/UpdateModal';

const textAppear = keyframes `
    0% { opacity: 0%},
    100% {opacity: 100%},
`
const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    overflow: scroll;
    animation: ${textAppear} 1s;
`
const Wrapper = styled.div`
    display: flex;
    margin-block: 50px;
    height: fit-content;
`
const ReceiptWrapper = styled.div`
    margin-top: 10px;
    background-color: ${(props) => props.theme.background};
    height: fit-content;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.2);
`

export const UserProfile: React.FC = () => {
    const {currentTab, updateCurrentUser, currentUser, modal} = useContext(Context) as UserContextState;
    const id: number = Number(localStorage.getItem("curUserI"));
    const log = localStorage.getItem("curUserL");

    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(()=> {
        updateCurrentUser(currentUser);
    }, []);

    useEffect(() => {
        try {
            axios.get<User>(
                "https://localhost:3000/users/user",
                {
                    headers: {
                        "Access-Control-Allow-Origin":"*"
                    },
                    params: {
                        id: id
                    }
                }).then((res) =>{
                    let userData = res.data;
                    if(userData){
                        updateCurrentUser(userData);
                        setLoading(false);
                    }
                })
        } catch (error) {
            console.log("Error: ", error);
        }
    }, []);

    if (loading){
        return <Container/>
    }

    return (
        <>
            {
                modal ? <UpdateModal/> : null
            }
            <Container>
                <Wrapper>
                    <ProfileNavigation/>
                    {
                        currentTab === '1' ?
                        (
                            <AccountDetails/>
                        )
                        :
                        (
                            <ReceiptWrapper>
                                <PastOrders/>
                            </ReceiptWrapper>
                        )
                    }
                </Wrapper>
            </Container>
        </>
    );
};
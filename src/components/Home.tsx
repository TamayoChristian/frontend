import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../context/UserContext';
import { User, UserContextState } from '../Types/User';

import Navbar from './Navbar/Navbar';
import Announcement from './Announcement/Annountcement';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Theme';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import { Route, Routes } from 'react-router-dom';
import Slider from './Slider/Slider';
import Login from './LoginRegister/Login';
import Cart from './Cart/Cart';
import ProductLayout from '../ProductLayout/ProductLayout';
import { UserProfile } from '../UserProfile/UserProfile';
import CheckoutCompleted from './CheckoutCompleted/CheckoutCompleted';

const Container = styled.div`
    background-color: ${(props) => props.theme.body};
    display: flex;
    flex-direction: column;
    height: 100vh;
`
const ThemeButton = styled.button`
    position: fixed;
    bottom: 60px;
    right: 20px;
    background: transparent;
    cursor: pointer;
    border: none;
`

const Home: React.FC = () => {
    const [theme, setTheme] = useState('light');
    const themeToggler = () => {
        if (localStorage.getItem('theme') === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }

    const id: number = Number(localStorage.getItem("curUserI"));
    const log = localStorage.getItem("curUserL");

    const { logged, updateCurrentUser, currentUser } = useContext(Context) as UserContextState;

    const getTheUser = async () => {
        try {
            let res = await axios.get<User>(
                'htpps://localhost:3000/users/user',
                {
                    headers: { ' Access-Control-Allow-Origin': '*' },
                    params: { id: id },
                }
            )
            let tUser = res.data;
            if (tUser) {
                updateCurrentUser(tUser);
            }
        }
        catch (e) {
            //TODO
        }
    };

    useEffect(() => {
        getTheUser();
        themeToggler();
    }, [])



    return (
        <ThemeProvider theme={localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme}>
            <ThemeButton onClick={themeToggler}>
                {
                    localStorage.getItem('theme') === 'light' ? 
                    <DarkModeOutlined style={{fontSize: '3em', borderRadius: '50%', backgroundColor: 'transparent', color: '#333'}}/>
                    :
                    <LightModeOutlined style={{fontSize: '3em', borderRadius: '50%', backgroundColor: 'transparent', color: 'white'}}/>
                }
            </ThemeButton>
            <Container>
                <Announcement/>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Slider/>}/>
                    <Route path='/shop' element={<ProductLayout/>}/>
                    {
                        (
                            logged || log
                        )
                        &&
                        localStorage.getItem("curUserL") === "true" ?
                        <Route path='/profile' element={<UserProfile/>}/>
                        : null
                    }
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/success' element={<CheckoutCompleted/>}/>
                </Routes>
            </Container>
        </ThemeProvider >
    )
};


export default Home;
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { UserContextState } from '../../Types/User';
import { Context } from "../../context/UserContext";
import bcrypt from "bcryptjs";

const fadeIn = keyframes`
  0% {opacity: 0%},
  100% {opacity: 100%};
`
const Container = styled.div`
  background-color: ${(props) => props.theme.body};
  padding: 40px;
  animation: ${fadeIn} 1s;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
const InputWrapper = styled.div`
  width: 100%;
  text-align: center;
`
const FinalWrapper = styled.div`
  width: 100%;
  margin: 5px;
  text-align: center;
`
const Label = styled.label`
    font-weight: bold;
    margin: 10px;
    text-align: left;
`
const Input = styled.input`
    font-size: 20px;
    width: 95%;
    padding: 5px;
    padding-inline: 8px;
    margin-bottom: 15px;
    color: ${(props) => props.theme.text};
    outline: 1px solid ${(props) => props.theme.border};
    border: none;
    background: transparent;
`
const LoginButton = styled.button`
    border: none;
    background: #047d40;
    padding: 15px;
    font-size: 20px;
    color: white;
    cursor: pointer;
    &:hover{
        box-shadow: inset 0 0 10px 10px rgba(0,0,0,0.3);
    }
`
const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const { logged, loginUser } = useContext(Context) as UserContextState;

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "firstname") {
            setFirstName(e.target.value);
        } else if (e.target.name === "lastname") {
            setLastName(e.target.value);
        }
    }

    const handleEncryptPassword = async () => {
        const saltRounds = 10;
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            setPassword(hashedPassword);
            console.log("Contraseña encriptada: ", hashedPassword);
        } catch (error) {
            console.error("Error al encriptar contraseña: ", error);
        }
        return;
    }

    const handleRegister = async () => {
        let register = {
            firstName,
            lastName,
            email,
            password
        };
        try {
            const headers = {
                'Access-Control-Allow-Origin': '*'
            };
            await handleEncryptPassword();
            let res = await axios.post('http://localhost:8080/users/register', register, { headers });
            let user = await res.data;
            if (user) {
                localStorage.setItem("curUserI", user.userId);
                loginUser(user);
                localStorage.setItem("curUserL", "true");
                setError(false);
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await handleRegister();
        if (!error) {
            navigate('/profile');
        }
    }

    return (
        <Container>
            {error ? <h4>Por favor, vuelve a intentar</h4> : <></>}
            <Form onSubmit={handleSubmit}>
                <Label>Nombre</Label>
                <InputWrapper>
                    <Input onChange={handleChange} name='firstName' type='text' />
                </InputWrapper>
                <Label>Apellido</Label>
                <InputWrapper>
                    <Input onChange={handleChange} name='lastName' type='text' />
                </InputWrapper>
                <Label>Correo Electrónico</Label>
                <InputWrapper>
                    <Input onChange={handleChange} name='email' type='email' />
                </InputWrapper>
                <Label>Contraseña</Label>
                <FinalWrapper>
                    <Input onChange={handleChange} name='password' type='password' />
                </FinalWrapper>
                <LoginButton type='submit'>Register</LoginButton>
            </Form>
        </Container>
    )
}

export default RegisterForm;

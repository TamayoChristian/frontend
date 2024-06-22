import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/UserContext";
import { User, UserContextState } from "../../Types/User";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

const textAppear = keyframes`
    0% {opacity: 0%},
    100% (opacity: 100%}
`
const Container = styled.div`
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.2);
    width: 600px;
    margin-top: 10px;
    height: fit-content,
    animation: ${textAppear} 0.5s;
`
const Title = styled.div`
    padding: 30px 25px 10px;
    font-weight: bold;
    font-size: 2em;
`
const Information = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px 25px 10px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding-inline: 25px;
    padding-bottom: 10px;
`
const InputWrapper = styled.div`
    width: 100%;
    margin: 5px;
    text-align: center;
`
const Label = styled.label`
    font-weight: bold;
    font-size: 18px;
    margin-block: 10px;
    text-align: left;
`
const Input = styled.input`
    width: 95%;
    font-size: 18px;
    padding: 5px;
    padding-inline: 8px;
    margin-bottom: 15px;
    color: ${(props) => props.theme.text};
    outline: 1px solid ${(props) => props.theme.border};
    background: transparent;
    border: none;
`
const ButtonWrapper = styled.div`
    width: 100%;
    text-align: center;
    background: #047d40;
`
const SaveChanges = styled.button`
    border: none;
    width: 100%;
    background: #047d40;
    padding: 15px;
    font-size: 20px;
    color: white;
    cursor: pointer;
    &:hover {
        box-shadow: inset 0 0 10px 10px rgba(0, 0, 0, 0.3);
    }
`

const AccountDetails: React.FC = () => {
    const { currentUser, updateCurrentUser, displayModal } = useContext(Context) as UserContextState;
    const [inputEmail, setInputEmail] = useState<string>(currentUser.email);
    const [inputAddress, setInputAddress] = useState<string>(currentUser.address);
    const [inputPhoneNumber, setInputPhoneNumber] = useState<string>(currentUser.phoneNumber);
    const [inputFirstName, setInputFirstName] = useState<string>(currentUser.firstName);
    const [inputLastName, setInputLastName] = useState<string>(currentUser.lastName);

    const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputEmail(e.currentTarget.value);
        if (e.currentTarget.value.length > 0 ){
            updateCurrentUser({...currentUser, email: e.currentTarget.value});
        }
    };
    const handleAddressChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputAddress(e.currentTarget.value);
        if (e.currentTarget.value.length > 0 ){
            updateCurrentUser({...currentUser, address: e.currentTarget.value});
        }
    };
    const handlePhoneNumberChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputPhoneNumber(e.currentTarget.value);
        if (e.currentTarget.value.length > 0 ){
            updateCurrentUser({...currentUser, phoneNumber: e.currentTarget.value});
        }
    };
    const handleFirstNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputFirstName(e.currentTarget.value);
        if (e.currentTarget.value.length > 0 ){
            updateCurrentUser({...currentUser, firstName: e.currentTarget.value});
        }
    };
    const handleLastNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputLastName(e.currentTarget.value);
        if (e.currentTarget.value.length > 0 ){
            updateCurrentUser({...currentUser, lastName: e.currentTarget.value});
        }
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
    };
    const handleSave = async () => {
        try {
            const { data } = await axios.put<User>(
                "https://localhost:3000/users/update",
                {
                    userId : currentUser.userId,
                    firstName : inputFirstName,
                    lastName : inputLastName, 
                    email : inputEmail,
                    address : inputAddress,
                    phoneNumber : inputPhoneNumber,
                }
            );
            setInputEmail(data.email);
            setInputAddress(data.address);
            setInputPhoneNumber(data.phoneNumber);
            setInputFirstName(data.firstName);
            setInputLastName(data.lastName);
            return data;
        } catch (error){
            if(axios.isAxiosError(error)){
                console.log("Error message: ",error.message );
                return error.message;
            } else {
                console.log("Unexpected error: ", error);
                return "An unexpected error ocurred";
            }
        }
    };

    const handleModal = () => {
        displayModal(true);
    };

    useEffect(() => {
        handleSave();
    }, []);

    return (
        <Container>
            <Title>
                <Person2OutlinedIcon style={{fontSize: "2rem"}}>Detalles de mi Cuenta</Person2OutlinedIcon>
            </Title>
            <Information>
                No dude en editar cualquier campo para mantener su perfil actualizado. asteriscos
                (*) se utilizan para indicar un campo obligatorio.
            </Information>
            <Form onClick={handleSubmit}>
                <Label>Correo Electrónico</Label>
                <InputWrapper>
                    <Input onChange={handleEmailChange} type='email' value={inputEmail}/>
                </InputWrapper>
                <Label>Dirección de Entrega</Label>
                <InputWrapper>
                    <Input onChange={handleAddressChange} value={inputAddress}/>
                </InputWrapper>
                <Label>Número de teléfono</Label>
                <InputWrapper>
                    <Input onChange={handlePhoneNumberChange} type='tel' value={inputPhoneNumber}/>
                </InputWrapper>
                <Label>Nombre</Label>
                <InputWrapper>
                    <Input onChange={handleFirstNameChange} value={inputFirstName}/>
                </InputWrapper>
                <Label>Apellido</Label>
                <InputWrapper>
                    <Input onChange={handleLastNameChange} value={inputLastName}/>
                </InputWrapper>
                <ButtonWrapper onClick={handleModal}>
                    <SaveChanges onClick={handleSave} type="button">Guardar Cambios</SaveChanges>
                </ButtonWrapper>
            </Form>
        </Container>
    );  
};

export default AccountDetails;
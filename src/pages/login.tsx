import React, {ChangeEvent, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useForm, SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router-dom";

type Inputs = {
    email: string,
    code: string,
};

function Login() {
    const [isSend, setIsSend] = useState(false)
    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState: {errors}, setError} = useForm<Inputs>();
    useEffect(() => {
        if(isSend) {
            setTimeout(() => {
                setIsSend(false);
            }, 90000)
        }
    }, [isSend])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if(isSend) {
            await handleVerify(data)
        } else {
            await sendEmail(data.email)
            setIsSend(true)
        }
        console.log(data);
    }
    const sendEmail = async (email:string) => {
        try {
            let res = await fetch(
                "https://api.kvartirabar.uz/v1/api/auth/",
                {
                    method: "POST",
                    headers: {'Content-Type': 'application/json;charset=utf-8'},
                    body: JSON.stringify({"email": email})
                })
            const result = await res.json();
            if (result.error) {
                console.log(result.message)
                setIsSend(false);
            }
            console.log(result.message)
            setIsSend(true);
        } catch (e: any) {
            console.log(e.message)
        }
    }
    const handleVerify = async ({email,code} : Inputs) => {
        let res = await fetch(`https://api.kvartirabar.uz/v1/api/auth/?code=${code}&email=${email}`);
        let result = await res.json();
        if (!result.payload) {
            console.log(result)
        }

        localStorage.setItem("email", email);
        localStorage.setItem("token", result.payload.accessToken);
        navigate("/")
    }



    const renderCode = () => {
        if (isSend)
            return (
                <TextField
                    {...register("code", {required: { value: true, message: "Обязательно к заполнению" }}) }
                    helperText="Срок действия 3 минуты!"
                    sx={{mb:"20px"}}
                    id="code" type="text" label="Код верификации" variant="outlined" />
            )
    }

    return (
        <Box component="form" className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" sx={{mb: "30px"}}>Войти в аккаунт</Typography>
            <TextField
                id="email" type="email" label="Электронная почта" variant="outlined"
                sx={{mb: "20px"}}
                {...register("email", {required: { value: true, message: "Обязательно к заполнению" }})}
            />
            {renderCode()}
            <Button
                variant="outlined"
                type="submit"
                sx={{margin: "0 auto", width: "200px", mb: "20px"}}>
                {!isSend ? "Отправить" : "Подтвердить"}
            </Button>
        </Box>
    );
}

export default Login;
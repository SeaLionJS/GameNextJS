import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import NextLink from "next/link";
import { Store } from "../utils/store";
import { useContext } from "react";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import fetch from "../components/controllers/fetch";
import Cookies from "js-cookie";

export default function Login() {
  const classes = {};
  const { state, dispatch } = useContext(Store);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  //console.log(redirect);

  const onSubmit = async ({ email, password }) => {
    closeSnackbar();
    try {
      const data = await fetch.postJSON("/api/login", {
        email,
        password,
      }); //server request
      if (data.status == "error") {
        enqueueSnackbar(data.code, { variant: "error" });
        return;
      }
      Cookies.set("UInfo", JSON.stringify(data));
      router.push("/");
    } catch (err) {
      console.log(err);
      //enqueueSnackbar(err, { variant: "error" });
    }
  };

  return (
    <MainLayout title="Логін">
      <Card
        sx={{
          display: "block",
          padding: 2,
          width: 300,
          margin: "10px auto",
        }}
      >
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h3" component="h1">
            Вхід
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Електронна пошта"
                      inputProps={{ type: "email" }}
                      error={Boolean(errors.email)}
                      helperText={
                        Boolean(errors.email)
                          ? errors.email.type === "pattern"
                            ? "Пошта не відповідає патерну"
                            : "Потрібно ввести поштову адресу"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  );
                }}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Пароль"
                    inputProps={{ type: "password" }}
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password
                        ? errors.password.type === "minLength"
                          ? "Довжина пароля не менше 6 символів"
                          : "Потрібно ввести пароль"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                Увійти
              </Button>
            </ListItem>
            <ListItem>
              <Typography>
                Ще не зарегіструвались?{" "}
                <NextLink href="/register">Регістрація</NextLink>
              </Typography>
            </ListItem>
          </List>
        </form>
      </Card>
    </MainLayout>
  );
}

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
import Fetch from "../components/controllers/fetch";
import GDialog from "../components/widgets/Dialog";

export default function Login() {
  const classes = {};
  const { state, dispatch } = useContext(Store);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //const { userInfo } = state;
  const router = useRouter();

  const [dialogVisible, setDialog] = useState(false);

  const onSubmit = async ({ email, name, surname, password, confirm }) => {
    closeSnackbar();
    if (password !== confirm) {
      enqueueSnackbar("Паролі не ідентичні!", { variant: "error" });
      return;
    }

    try {
      const data = await Fetch.postJSON("/api/register", {
        email,
        name,
        surname,
        password,
        confirm,
      }); //server request
      //console.log("We get from server", data.type);
      if (data.status == "error") {
        enqueueSnackbar(data.code, { variant: "error" });
        return;
      } else {
        setDialog(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout title="Регістрація">
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
            Регістрація
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
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Ім'я"
                      inputProps={{ type: "text" }}
                      error={Boolean(errors.name)}
                      helperText={
                        Boolean(errors.name) ? "Потрібно ввести ім'я" : ""
                      }
                      {...field}
                    ></TextField>
                  );
                }}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="surname"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="surname"
                      label="Прізвище"
                      inputProps={{ type: "text" }}
                      error={Boolean(errors.surname)}
                      helperText={
                        Boolean(errors.surname)
                          ? "Потрібно ввести прізвище"
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
              <Controller
                name="confirm"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 6 }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="confirm"
                    label="Підтвердити пароль"
                    inputProps={{ type: "password" }}
                    error={Boolean(errors.confirm)}
                    helperText={
                      errors.confirm
                        ? errors.confirm.type === "minLength"
                          ? "Довжина пароля не менше 6 символів"
                          : "Потрібно підтвердити пароль"
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
                Підтвердити
              </Button>
            </ListItem>
            <ListItem>
              <Typography>
                Повернутися на сторінку входу?{" "}
                <NextLink href="/login">Вхід</NextLink>
              </Typography>
            </ListItem>
          </List>
        </form>
      </Card>
      <GDialog
        visible={dialogVisible}
        header="Регістрація успішно завершена!"
        type="info"
        text="Вітаємо. Регістрація успішно завершена! Тепер ви можете увійти у свій аккаунт користуватися усіми функціями!"
        onAgree={() => {
          setDialog(false);
          router.push("/login");
        }}
      />
    </MainLayout>
  );
}

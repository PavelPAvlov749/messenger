import React from "react";
import { Formik, Field, Form } from "formik";
import {log_in} from "../../Redux/auth_reducer";
import {useDispatch} from "react-redux";
import {auth_actions} from "../../Redux/auth_reducer";
import {Dispatch_type} from "../../Redux/auth_reducer"
type Form_type = {
    login: string,
    password: string
}

export const Login: React.FC = React.memo(() => {
    console.log("LOGIN")
    let login = "";
    let password = "";
    let dispatch = useDispatch()
    const set_submit = (values: Form_type,) => {
        login = values.login;
        password = values.password;
        dispatch<any>(log_in(login,password))
        console.log("login thunk")
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <Formik
                enableReinitialize={true} //<= If true Form will reinitialize after reciving new initial value from state 
                className="login_forms"
                initialValues={{ login: login, password: password }} onSubmit={set_submit}>
                <Form>
                    <Field type="text" name="login"></Field>
                    <Field type="text" name="password"></Field>
                    <button type="submit">Login</button>
                </Form>

            </Formik>
        </div>

    )
})
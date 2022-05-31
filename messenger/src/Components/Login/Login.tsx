import React, { Dispatch } from "react";
import { Formik, Field, Form } from "formik";
import {Sign_in_with_pop_up} from "../../Redux/auth_reducer";
import { Global_state_type } from "../../Redux/Store";
import {connect} from "react-redux";

type Form_type = {
    login: string,
    password: string
}
type PropsType = {
    is_auth : boolean,
    auth_token? : string | undefined,
    sign_in : () => void
}

export const Login: React.FC<PropsType> = React.memo((props) => {

    let login = "";
    let password = "";
    const set_submit = (values: Form_type,) => {
        login = values.login;
        password = values.password;
        props.sign_in();

    }
    const sign_in_with_google = ()=>{
        //@ts-ignore
        props.sign_in();
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
            <section className="Sign_in_with_google">
                <h2>
                    Sign in with Google
                </h2>
                <button type="button" onClick={sign_in_with_google}>Google</button>
            </section>
        </div>

    )
})

const MapStateToProps = (state:Global_state_type) => {
    return {
        is_auth : state.auth.is_auth,
        auth_token : state.auth.auth_token
    }
};
const MapDispatchToProps = (dispatch : any) => {
    return {
        sign_in : () =>{
            dispatch(Sign_in_with_pop_up())
        }
    }
}
export const Login_container = connect(MapStateToProps,MapDispatchToProps)(Login);
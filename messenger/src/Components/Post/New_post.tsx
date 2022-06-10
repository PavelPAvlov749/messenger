import React from "react";
import { Field, Form, Formik } from "formik";
import {Firestore_instance} from "../../DAL/Firestore_config";
import { Firebase_instance } from "../../DAL/Firebase_config";
import { Navigate } from "react-router-dom";


type PostFormType = {
    post_text : string,
    post_img : string,
    post_tag : string
};


export const New_post_page : React.FC = () => {
    let new_post_text = "";
    let new_post_img = "";
    let new_post_tag = ""
    const set_submit = (values : PostFormType) => {
        Firestore_instance.add_post(values.post_text,values.post_img);
        
    }
     return (
        <div className="New_post_page"
        style={{alignItems: "center"}}>
        <h1 style={{
            marginRight: "50%",
            fontWeight: 400}}>New Post :</h1>
        <Formik
        className ="New_post_form"
        enableReinitialize = {true}
        initialValues={{
            post_text : new_post_text,
            post_img : new_post_img,
            post_tag : new_post_tag
        }} onSubmit={set_submit}>
            <Form style={{
                fontWeight : 300
            }}>
                <h3>Type text of your post</h3>
                <Field type="text" name="post_text"></Field>
                <h3>Load the photo</h3>
                <Field type="text" name="post_img"></Field>
                <h3>Add tag to your post</h3>
                <Field type="text" name="post_tag"></Field>
                <br>
                </br>
                <button type="submit">Create</button>
            </Form>
        </Formik>
        </div>

    )
}
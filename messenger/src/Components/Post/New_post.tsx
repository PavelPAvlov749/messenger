import React from "react";
import { Field, Form, Formik } from "formik";
import {Firestore_instance} from "../../DAL/Firestore_config";
import { Firebase_instance } from "../../DAL/Firebase_config";
import { Navigate, useLocation,useNavigate } from "react-router-dom";
import {Db_instance} from "../../DAL/Firebase_config";
import { useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import styles from "../../Styles/new_post.module.css";


type PostFormType = {
    post_text : string,
    post_img : string,
    post_tag : string
};


export const New_post_page : React.FC = () => {
    const creator = useSelector((state:Global_state_type) => {
        return state.profile.profile.user_name;
    });
    const user_id = useSelector((state:Global_state_type) => {
        return state.profile.profile.id
    });
    const location = useNavigate();
    let new_post_text = "";
    let new_post_img = "";
    let new_post_tag = "";
    let new_post_photo : any;
    const set_submit = (values : PostFormType) => {
        Db_instance.add_posts(values.post_text,values.post_img,creator,user_id);
        location("/me")
    }
    const photoOnLoad = (e:any) => {
        new_post_photo = e.target.files[0];
        console.log(new_post_photo)
    }
     return (
        <div className={styles.new_post_wrapper}
        >
        <Formik
        className ={styles.formik_fields}
        enableReinitialize = {true}
        initialValues={{
            post_text : new_post_text,
            post_img : new_post_img,
            post_tag : new_post_tag
        }} onSubmit={set_submit}>
            <Form style={{
                fontWeight : 300
            }}>
                <h2>Add new posts ...</h2>
                <hr />
                <h3>Type text of your post : </h3>
                <Field type="text" name="post_text"></Field>
                <br/>
                <h3>Load the photo : </h3>
                <Field type="text" name="post_img"></Field>
                <br/>
                <h3>Add tag to your post : </h3>
                <Field type="text" name="post_tag"></Field>
                <br/>
                {/* <h3>Or upload the file</h3> */}
                {/* <input type="file" placeholder="load the file" title=" " onClick={photoOnLoad}></input> */}
                <hr />
                <button type="submit">Create</button>
            </Form>
        </Formik>
        </div>

    )
}
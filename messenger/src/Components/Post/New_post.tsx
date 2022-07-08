import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Firestore_instance } from "../../DAL/Firestore_config";
import { Firebase_instance } from "../../DAL/Firebase_config";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Db_instance } from "../../DAL/Firebase_config";
import { useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import styles from "../../Styles/new_post.module.css";
import { upload_photo } from "../../DAL/Cloud_storage";
import { set } from "firebase/database";
import { read } from "fs";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Storage } from "../../DAL/Cloud_storage";
import {
    ref, uploadBytes,
    getDownloadURL,
} from "firebase/storage"
import placeholder from "../../Media/placeholder.png"
type PostFormType = {
    post_text: string,
    post_img: string,
    post_tag: string,
    file: any
};


export const New_post_page: React.FC = () => {
    const creator = useSelector((state: Global_state_type) => {
        return state.profile.profile.user_name;
    });
    const user_id = useSelector((state: Global_state_type) => {
        return state.profile.profile.id
    })
    const location = useNavigate();
    let new_post_text = "";
    let new_post_img = "";
    let new_post_tag = "";
    let [file, set_file] = useState(null);
    let [url,set_url] = useState(null as unknown as string);



    const photoOnLoad = (e: any) => {
        if(e.target.files[0]){
            set_file(e.target.files[0]);
        }
    }
    const set_submit = (values: PostFormType, img: any) => {
        Db_instance.add_posts(values.post_text, values.file, creator, user_id).then(() => {
            location("/me")
        });
    }

    return (
        <div className={styles.new_post_wrapper}
        >
            <label htmlFor="file_input">
                <img src={url === null ? placeholder : url} alt="" style={{ "width": "300px", "height": "300px","objectFit" : "contain" ,"cursor" : "pointer",
                }} />
            </label>
               

            <Formik
                className={styles.formik_fields}
                enableReinitialize={true}
                initialValues={{
                    post_text: new_post_text,
                    post_img: new_post_img,
                    post_tag: new_post_tag,
                    file: file
                }} onSubmit={set_submit}>
                <Form style={{
                    fontWeight: 300
                }} >
                    <hr />
                    <h3>Type text of your post : </h3>
                    <Field type="text" name="post_text"></Field>
                    <br />
                    <br />
                    <h3>Add tag to your post : </h3>
                    <Field type="text" name="post_tag"></Field>
                    <br />
                    <input type="file" placeholder="Put eout file" id="file_input" accept="image/*" style={{"display" : "none"}} onChange={photoOnLoad}></input>
                    <hr />
                    <button type="submit">Create</button>
                </Form>
            </Formik>
        </div>

    )
}
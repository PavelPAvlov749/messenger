import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import styles from "../../Styles/Status.module.css";



type UserStatusType = {
    user_id: string,
    status: string,
    set_new_status: (user_id: string, statis: string) => void,
    get_status: (user_id: string | null | undefined) => void
}

export const UserStatus: React.FC<UserStatusType> = (props) => {
    let [edit_mode, set_edit_mode] = useState(false);
    let [status, set_status] = useState(props.status);
    useEffect(() => {
        set_status(props.status)
    }, [props.status])

    const activate_edit_mode = () => {
        set_edit_mode(true)
    }
    const deactivate_edit_mode = () => {
        set_edit_mode(false)
        props.set_new_status(props.user_id,status)
    }

    const on_status_change = (e: any) => {
        set_status(e.currentTarget.value)
    }


    return (
        <>
            {!edit_mode ? <span style={{ "fontWeight": "400", "fontSize": "20px", "width": "100px" }} onClick={activate_edit_mode} >{props.status}</span> :
                <div className={styles.status_input}>
                    <input type="text" title="Edit" value={status} onChange={on_status_change} onBlur={deactivate_edit_mode} autoFocus={true}></input>
                </div>

            }
        </>
    )
}
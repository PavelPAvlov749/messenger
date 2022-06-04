import React, { MouseEventHandler, useState } from "react";


//                                        ...................TYPES FOR POST AND USER_POSTS COMPONENTS....................
//Single coment type
type ComentType = {
    coment : string,
    coment_likes : number,
    coment_owner_name : string,
    date : number
}
//Type for single post component
export type PostType = {
    comments : Array<ComentType> ,
    likes : number,
    is_open : boolean,
    post_img : string,
    post_text : string
}
//All posts type
type UserPostsType = {
    user_posts : Array<PostType>
}
//                                                  .....................REACT COMPONENTS........................
//Single post compoent 
export const Post : React.FC<PostType> = (props)=>{
    const [is_showing,set_is_showing] = useState(false);
    const show_post = () => {
        if(is_showing){
            set_is_showing(false)
        }else {
            set_is_showing(true)
        }
        
    }
    return (
        <div className="single_post" style={{ marginRight : "40%",}}>
            <br></br>
            <img src={props.post_img} alt="#" onClick={show_post}
            style={{
                width: "220px",
                height: "220px",
            }}></img>
            {
            is_showing ? 
            props.comments.map((el) => {
                return (
                    <div className="post_coment">
                        <span>{el.coment_owner_name}</span>
                        <br></br>
                        <span>{el.coment}</span>
                        <span>{el.coment_likes + "likes"}</span>
                        <h3>{el.date}</h3>
                    </div>
                )
            })
            : null
            }

        </div>
    )
}

export const UserPosts :React.FC<UserPostsType> = (props) => {
    
    return (
        <div className="user_posts">
            {props.user_posts ? null : <h3 style={{fontWeight : 500}}>No posts yet ...</h3>}
            {props.user_posts?.map((el)=>{
                return (
                    <Post post_img={el.post_img} comments={el.comments} likes={el.likes} is_open={el.is_open} post_text={el.post_text}/>
                )
            })}
        </div>
    )
}
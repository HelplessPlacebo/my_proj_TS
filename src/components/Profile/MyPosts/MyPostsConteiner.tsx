import React from 'react';
import {addpost} from "../../../data/ProfileReduser";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {GetIsMyPageSelector, GetPostsSelector} from "../../../data/ProfileSelectors";
import {GlobalState} from "../../../data/redux-store";
import {TMyPostContainerProps} from "../../GlobalTypes/ProfileTypes/ProfileTypes";



class MyPostsConteiner extends React.PureComponent<TMyPostContainerProps> {

    render() {

        return (
            <MyPosts posts={this.props.posts}
                     addpost={this.props.addpost}
                     profile={this.props.profile}
                     IsMyPage={this.props.IsMyPage}/>
        )
    }
}

let StateProps = (state : GlobalState) => ({
    posts: GetPostsSelector(state),
    IsMyPage: GetIsMyPageSelector(state)
})

export default connect(StateProps, {addpost})(MyPostsConteiner)

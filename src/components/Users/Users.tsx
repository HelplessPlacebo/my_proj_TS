import React from 'react'
import Paginator from "../assetss/common/Paginator/Paginator";
import User from "./User";
import FindUser from "./FindUser";
import us from "./Users.module.css"
import {TUsersProps} from "../GlobalTypes/UsersTypes/UsersTypes";
import ControlledOpenSelect from "./SelectPageSize.";




let PurifyUsers : React.FC<TUsersProps> = (props) => {

    props.ChangePortionSize(15);

    return <div>

            <FindUser  FindUserThunk={props.FindUserThunk}
                      FoundedUsers={props.FoundedUsers}
                      InProcess={props.InProcess}
                      OnUnFollow={props.OnUnFollow}
                      OnFollow={props.OnFollow}
                      IsLogined={props.IsLogined}
                       FindUserIsFetching={props.FindUserIsFetching}
            />
       <ControlledOpenSelect PageSize={props.pageSize}
                              OnPageSizeChange={props.OnPageSizeChange}/>

        <div className={us.UsersWrapper}>
        { props.Users && props.Users.map(us =>  <User
            user={us}
            key={us.id}
            InProcess={props.InProcess}
            OnUnFollow={props.OnUnFollow}
            OnFollow={props.OnFollow}
            IsLogined={props.IsLogined}
        />)
        }
        </div>

        <div className={us.PaginatorPosition}>
       <Paginator OnChangedPage={props.OnChangedPage}
                  currentPage={props.currentPage}
                  totalUsersCount={props.totalUsersCount}
                      pageSize={props.pageSize}
                  PortionSize={props.PortionSize}
       />
        </div>
    </div>
}
export default PurifyUsers
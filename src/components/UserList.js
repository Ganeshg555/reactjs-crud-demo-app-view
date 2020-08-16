import React from "react";

export const UserList = props => {

    const userList = props.users;
    const userItems = userList.map((user) =>
        <li key={user.id} style={{listStyleType: "none"}}>
            <div className="row">
                <div className="col-sm-2">{user.id}</div>
                <div className="col-sm-6">{user.username}</div>
                <div className="col-sm-2">{user.source}</div>
                <div className="col-sm-2">
                    <input 
                        type="submit" 
                        value="Update"
                        className="btn btn-warning"
                        style={{margin: '5px'}}
                        onClick={props.onUpdateClick.bind(this, user)}
                        />
                    <input 
                        type="submit" 
                        value="Delete "
                        className="btn btn-danger"
                        style={{margin: '5px'}}
                        onClick={props.onDeleteClick.bind(this, user)}
                        />
                </div>
            </div>
        </li>
    );
    return (
        <>
            <div className="row">
                <div className="col-sm-2 font-weight-bold">ID</div>
                <div className="col-sm-6 font-weight-bold">User name</div>
                <div className="col-sm-2 font-weight-bold">Source</div>
                <div className="col-sm-2"></div>
            </div>
            <hr />
            <ul>{userItems}</ul>
        </>
    );
}
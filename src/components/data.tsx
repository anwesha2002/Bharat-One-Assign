import {UserInfo} from "../Model/userInfo.ts";
import {Button} from "react-bootstrap";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;

type DataProps = {
    user : UserInfo | DocumentData
    onUserEdit : (user : UserInfo |  DocumentData | null) => void
}

export default function Data({user, onUserEdit}:DataProps){
    return(
        <>
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td >{user.Email}</td>
                <td>{user.Age}</td>
                <td>{user.Gender}</td>
                <td>{user.City}</td>
                <td><Button onClick={()=>{onUserEdit(user)}}>Edit</Button></td>
            </tr>
        </>
    )
}
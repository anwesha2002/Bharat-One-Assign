import {Container, Table} from "react-bootstrap";
import  {useEffect, useState} from "react";
import { getDocs , query}  from 'firebase/firestore'
import {db} from "../firebase.ts";
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import Data from "../components/data.tsx";
import {UserInfo} from "../Model/userInfo.ts";
import DataHead from "../components/DataHead.tsx";
import Navbar from "../components/Navbar.tsx";
import AddUserModal from "../components/AddUserModal.tsx";

export default function Home(){
    const [user, setUser] = useState<DocumentData[]| UserInfo[]>([])
    const userCollectionRef = query(db.collection("users").orderBy("name"));
    const [userToEdit , setUserToEdit] = useState<UserInfo | DocumentData | null>(null)

    useEffect(() => {
        const getData = async () => {
            try {
                //const q = query(userCollectionRef, orderBy("name " , "desc"))
                const data = await getDocs(userCollectionRef);
                setUser(data.docs.map((doc)=>(
                    {...doc.data(), id : doc.id}
                )));
            }catch (err)
            {
                console.log(err);
            }
        }
        getData()
    }, []);
    {console.log(user)}

    return(
        <>
            <Navbar />
            <Container>
                <Table>
                    <thead>
                        <DataHead/>
                    </thead>
                    <tbody>
                    {user.map(data=> <Data key={data.id} user={data} onUserEdit={setUserToEdit}></Data>)}
                    </tbody>
                </Table>
                {userToEdit &&
                    <AddUserModal
                        userToEdit={userToEdit}
                        onDismiss={()=>{setUserToEdit(null)}}
                        onAdduser={( )=>{
                            setUserToEdit(null)
                        }}
                    />
                }
            </Container>
        </>
    )
}
import {Button, Col, Container} from "react-bootstrap";
import {Navbar as NavbarBs} from "react-bootstrap";
import { useState} from "react";
import AddUserModal from "./AddUserModal.tsx";



export default function Navbar( ){
    const [showModal, setShowModal] = useState(false)

    return(
        <>
            <Container>
                <NavbarBs className="bg-body-tertiary justify-content-between">
                        <NavbarBs.Brand>Users</NavbarBs.Brand>
                        <Col xs="auto">
                            <Button type="submit" onClick={()=>{setShowModal(true)}}>Add + </Button>
                        </Col>

                </NavbarBs>
                {showModal &&
                    <AddUserModal
                        onDismiss={()=>setShowModal(false)}
                        onAdduser={()=>{
                            setShowModal(false)
                        }}
                    />
                }
            </Container>
        </>
    )
}
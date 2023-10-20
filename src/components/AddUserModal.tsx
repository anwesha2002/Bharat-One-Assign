import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {UserInfo} from '../Model/userInfo.ts'
import {db} from "../firebase.ts";
import { setDoc, doc, updateDoc} from 'firebase/firestore'
import firebase from "firebase/compat/app";
import DocumentData = firebase.firestore.DocumentData;
import * as Yup  from 'yup'
import {number, string} from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

type addModalProps = {
    onDismiss:()=> void
    onAdduser : (user :  void) => void
    userToEdit? : UserInfo | DocumentData
}

const userSchema :  Yup.ObjectSchema<UserInfo | DocumentData>  = Yup.object().shape({
    name : string().required(),
    Email : string().email("Enter valid email").required(),
    Age : number().required().positive().integer("Age must be a number"),
    Gender : string().required(),
    City : string().required()
})

export default function AddUserModal({onDismiss, onAdduser, userToEdit } :addModalProps ){
    const { register, handleSubmit , formState : {errors, isSubmitted} } = useForm<UserInfo | DocumentData >({
        defaultValues:{
            name : userToEdit?.name || "",
            Email : userToEdit?.Email || "",
            Age : userToEdit?.Age || "",
            Gender : userToEdit?.Gender || "",
            City : userToEdit?.City || "",
            id : userToEdit?.id || ""
        }, resolver : yupResolver(userSchema)
    })
    const userCollectionRef = db.collection("users");

    async function onSubmit(input : UserInfo | DocumentData ){
        try {
           let data
            if(userToEdit){
                const userDoc = doc(db,"users", userToEdit.id)
                data = await updateDoc(userDoc, input)
            }else{
                data  = await setDoc(doc(userCollectionRef), input)
            }
            onAdduser(data)
            {console.log(data)}
        }catch (err){
            console.log(err)
        }
    }

    return (
        <>
            <Modal show onHide={onDismiss}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        user
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form id="addUser" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                isInvalid={!!errors.name}
                                {...register("name" , {required : "required"})}
                            />
                            <Form.Control.Feedback type="invalid">
                                {String(errors.name?.message)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                isInvalid={!!errors.Email}
                                {...register("Email" , {required : "required"})}
                            />
                            <Form.Control.Feedback type="invalid">
                                {String(errors.Email?.message)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Age"
                                isInvalid={!!errors.Age}
                                {...register("Age" , {required : "required"})}
                            />
                            <Form.Control.Feedback type="invalid">
                                {String(errors.Age?.message)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Gender"
                                isInvalid={!!errors.Gender}
                                {...register("Gender" , {required : "required"})}
                            />
                            <Form.Control.Feedback type="invalid">
                                {String(errors.Gender?.message)}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                isInvalid={!!errors.City}
                                {...register("City" , {required : "required"})}
                            />
                            <Form.Control.Feedback type="invalid">
                                {String(errors.City?.message)}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                       type="submit"
                       form="addUser"
                        disabled={isSubmitted}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
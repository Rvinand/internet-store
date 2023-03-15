import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createCategory} from "../../http/deviceAPI";

const CreateCategory = ({show, onHide}: { show: boolean, onHide: () => void }) => {
    const [name, setName] = useState('')
    const [icon, setIcon] = useState(null)

    const selectFile = (e: { target: { files: React.SetStateAction<null>[]; }; }) => {
        setIcon(e.target.files[0])
    }

    const addCategory = () => {
        const formData = new FormData()
        formData.append('name', name)

        if (icon === null) {
            console.log(new Error("Вы не выбрали иконку").message)
            return
        } else {
            formData.append('icon', icon)
        }

        createCategory(formData)
            .then(() => {
                setName('')
                onHide()
            })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Введите название категории"}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        // @ts-ignore
                        onChange={selectFile}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCategory}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategory;

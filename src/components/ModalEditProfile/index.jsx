import { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Ctx from "../../context";

const ModalEditProfile = () => {
    const { setModalEditProfile, api, modalEditProfile, profile, setProfile } = useContext(Ctx);
    const [img, setImg] = useState("");
    const handleClose = (e) => {
        setModalEditProfile(false);
    }

    const sendForm = (e) => {
        e.preventDefault();
        const body = {
            avatar: img
        }
        api.updProfile(body, img)
            .then(data => {
                console.log(data);
                setProfile(data);
                handleClose();
            })
    }
    return (
        <div
            className="modal-wrapper"
            style={{ display: modalEditProfile ? "flex" : "none" }}
        >
            <Modal.Dialog
                className="bg-light text-dark rounded-1 p-4"
                centered
                size="lg"
            >
                <Modal.Header className="p-2">
                    <Modal.Title>Изменить профиль</Modal.Title>
                    <Button variant="outline-secondary" className="ms-3"
                        onClick={handleClose}>
                        x
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={sendForm}>
                        <div className="mb-3 border rounded -1" style={{
                            backgroundImage: `url(${img})`,
                            backgroundSize: "cover",
                            height: "16.05rem",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }}></div>
                        <Form.Group className="my-4">
                            <Form.Label htmlFor="pictures">Изображение профиля</Form.Label>
                            <Form.Control
                                type="url"
                                id="pictures"
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant={"outline-secondary"}
                            type="submit" className="mt-2">
                            Изменить
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default ModalEditProfile;
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Container, Form, Row, Col } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import "./style.css";
import Ctx from "../../context";


const ModalAuth = () => {
	const [auth, setAuth] = useState(true);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [testPwd, setTestPwd] = useState("");
	const navigate = useNavigate();
	const { setUser, modalActive, setModalActive, api } = useContext(Ctx);

	const testAccess = {
		color: pwd === testPwd ? "forestgreen" : "crimson"
	}

	const switchAuth = (e) => {
		e.preventDefault();
		setAuth(!auth);
		clearForm();
	}

	const clearForm = () => {
		setName("");
		setEmail("");
		setPwd("");
		setTestPwd("");
	}

	const sendForm =  async (e) => {
		e.preventDefault();
		let body = {
			email: email,
			password: pwd
		}
		if (!auth) {
			body.name = name;
			body.group = "group-12";
		}

		let log = "https://api.react-learning.ru/signin";
		let reg = "https://api.react-learning.ru/signup";

		let res = await fetch(auth ? log : reg, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		let data = await res.json()
		if (!data.err) {
			if (!auth) {
				delete body.name;
				delete body.group
				let resLog = await fetch(log, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
				})
				let dataLog = await resLog.json()
				if (!dataLog.err) {
					localStorage.setItem("blogUser", dataLog.data.name);
					localStorage.setItem("blogToken", dataLog.token);
					localStorage.setItem("userBlogID", dataLog.data._id);
					localStorage.setItem("setGroupId", dataLog.group);
					clearForm();
					setModalActive(false);
					setUser(dataLog.data.name);
				}
			} else {
				if (!data.err) {
					localStorage.setItem("blogUser", data.data.name);
					localStorage.setItem("blogToken", data.token);
					localStorage.setItem("userBlogID", data.data._id);
					localStorage.setItem("groupId", data.data.group);
					clearForm();
					setModalActive(false);
					setUser(data.data.name);
					// navigate("/profile");
				}
			}
		}

	}
	return <div
		className="modal-wrapper"
		style={{ display: modalActive ? "flex" : "none" }}
	>
		<Modal.Dialog
			className="bg-light text-dark rounded-1 p-4"
			centered
			size="lg"
		>
			<Modal.Header>
				<Modal.Title>Авторизация</Modal.Title>
				<Button variant="outline-secondary" size="sm" onClick={() => setModalActive(false)}>
					<X />
				</Button>
			</Modal.Header>
			<Container className="d-grid gap-3 p-4">
				<Form onSubmit={sendForm}>
					{!auth &&
						<Form.Group>
							<Form.Label htmlFor="name">Имя пользователя
							</Form.Label>
							<Form.Control
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
					}
					<Form.Group>
						<Form.Label htmlFor="email">Электронный адрес</Form.Label>
						<Form.Control
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label htmlFor="password">Пароль</Form.Label>
						<Form.Control
							type="password"
							id="password"
							value={pwd}
							onChange={(e) => setPwd(e.target.value)}
						/>
					</Form.Group>
					{!auth &&
						<Form.Group>
							<Form.Label htmlFor="testpwd">	Повторить пароль</Form.Label>
							<Form.Control
								type="password"
								id="testpwd"
								value={testPwd}
								onChange={(e) => setTestPwd(e.target.value)}
								style={testAccess}
							/>
						</Form.Group>
					}
					<Button variant="secondary"
						disabled={!auth && (!pwd || pwd !== testPwd)}
						onClick={sendForm}
					>
						{auth ? "Войти" : "Создать аккаунт"}</Button>
					<Button variant="primary"
						onClick={switchAuth}>
						{auth ? "Регистрация" : "Войти"}</Button>
				</Form>
			</Container>
		</Modal.Dialog>
	</div >
}

export default ModalAuth;
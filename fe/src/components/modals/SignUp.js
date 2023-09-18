import { Button, Modal, Form, Col, Row, InputGroup, Stack } from "react-bootstrap";
import React, { useState } from "react";

const SignUp = (props) => {

    //이름, 닉네임, 이메일, 인증번호, 비밀번호 리덕스 저장

    //검증 state
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const clickSingnUp = () => {
        console.log(validated)

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    회원가입
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}
                    style={{ display: "flex", alignItems: 'center', flexFlow: 'column' }}
                >
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="이름을 입력해주세요"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="닉네임을 입력해주세요"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="이메일을 입력해주세요"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom04">
                            <Form.Label>인증번호</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="이메일을 입력해주세요"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="비밀번호을 입력해주세요"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button
                        type="submit"
                        style={{ marginLeft: 'auto' }}
                        onClick={clickSingnUp}
                    >회원가입</Button>
                </Form>
            </Modal.Body>
        </Modal >
    )
}

export default SignUp
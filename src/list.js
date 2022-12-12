import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import styles from './styles.module.css';
import cx from 'classnames';

const List = ({ data = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true)
    }, [data]);

    const ContainerDiv = styled(Container)`
  font-family: sans-serif;
  text-align: center;
`;

    const handleOpen = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const [isDropzoneActive, setDropzoneActive] = useState(false);

    const onDrop = () => {
        setDropzoneActive(false);
    };

    const onDragOver = (evt) => {
        evt.preventDefault();
    };

    const onDragEnter = () => {
        setDropzoneActive(true);
    };

    const onDragLeave = () => {
        setDropzoneActive(false);
    };

    const className = cx({}, { [styles.nodeDropzone]: isDropzoneActive });

    const getStatusClass = (status) => {
        if (status == "inProgress") {
            return "inProgress"
        } else if (status == "completed") {
            return "completed"
        } else {
            return ""
        }
    }

    return (
        <ContainerDiv fluid className={className}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}>
            <Row></Row>
            <Row style={{ padding: "10px" }}>
                <Col md={7} className="subGoal">
                    <div>subGoal</div>
                    <div><b>Run</b></div>
                </Col>
                <Col md={5} className="addAction">
                    <Button variant="light">Add Action</Button>{' '}
                </Col>
                <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
            </Row>

            <Row style={{ textAlign: "left", padding: "10px" }} className={"actionsMain"} onClick={handleOpen}><b><span className="it1">ACTIONS</span> <span className="it2">(Click to Toggle)</span></b></Row>
            {isOpen ? <Row style={{ padding: "10px" }}>
                {
                    data.map(item => {
                        return (
                            <div className={"actionsItem " + getStatusClass(item?.status)}>
                                {item?.text} {item?.status != "completed" ? <img style={{ float: "right" }} src="/check-circle.svg" /> : <></>}
                            </div>
                        )
                    })
                }
            </Row> : <></>}

        </ContainerDiv>
    );
}

export default List;
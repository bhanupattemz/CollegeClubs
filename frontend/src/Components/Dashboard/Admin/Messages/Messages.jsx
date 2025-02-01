import "./Messages.css";
import { Fragment, useEffect, useState, useRef } from "react";
import AdminSetup from "../AdminSetUp";
import Loading from "../../../Loaders/Loading";
import axios from "axios";
import { BACKENDURL } from "../../../Functionalities/functionalites";
import { MdDelete } from "react-icons/md";
import { useNavigate, Link } from "react-router";
import { ConvertTime } from "../../../Functionalities/functionalites";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaReply } from "react-icons/fa";

export default function Messages() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    });
    const [open, setOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const navigate = useNavigate();
    const [key, setKey] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const descriptionElementRef = useRef(null);

    const deleteMessage = async (_id) => {
        try {
            setLoading(true);
            const response = await axiosInstance.delete(`/contact/${_id}`);
            setMessages(response.data.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    async function getMessages() {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/contact?key=${key}`);
            setMessages(response.data.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        getMessages();
    }, []);

    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    if (loading) return <AdminSetup current={"messages"} element={<Loading />} />;

    return (
        <AdminSetup current={"messages"} element={
            <section className="messages-container">
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    scroll={"paper"}
                    aria-labelledby="message-dialog-title"
                    aria-describedby="message-dialog-description"
                >
                    <DialogTitle id="message-dialog-title">Message Details</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText id="message-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            {selectedMessage ? (
                                <div className="email-container">
                                    <div className="email-header">
                                        <div className="email-from">
                                            <strong>From:</strong> {selectedMessage.name} &lt;{selectedMessage.mail}&gt;
                                        </div>
                                        <div className="email-time">
                                            {ConvertTime(selectedMessage.createdAt)}
                                        </div>
                                    </div>
                                    <div className="email-subject">
                                        <strong>Subject:</strong> {selectedMessage.subject}
                                    </div>
                                    <div className="email-body">
                                        <p>{selectedMessage.message}</p>
                                    </div>
                                </div>
                            ) : "No message selected"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            href={`mailto:${selectedMessage?.mail}`}
                        >
                            Reply
                        </Button>
                    </DialogActions>
                </Dialog>
                <form className="search-form" onSubmit={(e) => {
                    e.preventDefault();
                    getMessages();
                }}>
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="search-input"
                        placeholder="Search messages..."
                    />
                    <button className="search-button">Search</button>
                </form>
                {messages && messages.length !== 0 ? (
                    <Fragment>
                        {messages.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => { setSelectedMessage(item); setOpen(true); }}
                                className="message-card"
                            >
                                <div>
                                    <h2 className="message-subject">{item.subject}</h2>
                                    <div className="message-email">{item.mail}</div>
                                    <p className="message-name">{item.name}</p>
                                </div>
                                <div>
                                    <span className="message-time">{ConvertTime(item.createdAt)}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteMessage(item._id);
                                        }}
                                        className="delete-button"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </Fragment>
                ) : (
                    <div className="no-messages">No messages yet!</div>
                )}
            </section>
        } />
    );
}

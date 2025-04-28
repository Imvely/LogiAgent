import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    &::placeholder {
        font-size: 16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }
    &:focus {
        outline: none;
        border-color: #ed1b24;
    }
`;

const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #ed1b24;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #ed1b24;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

const AttachFileInput = styled.input`
    display: none;
`;

const SubmitBtn = styled.input`
    background-color: #ed1b24;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.9;
    }
`;


export default function PostReviewForm() {
    const [isLoading, setLoaing] = useState(false);
    const [review, setReview] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || review === "" || review.length > 180) return;
        try {
            setLoaing(true);
            await addDoc(collection(db, "ai-tpj"), {
                review,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoaing(false);
        }
    }
    return <Form>
        <TextArea rows={5} maxLength={180} onChange={onChange} value={review} placeholder="Upload your review." />
        <AttachFileButton htmlFor="file">{file ? "IMG added ✅" : "ADD IMG"}</AttachFileButton>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
        <SubmitBtn type="submit" value={isLoading ? "Uploading..." : "Upload review"} />
    </Form>;
}
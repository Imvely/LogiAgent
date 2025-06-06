import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
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
    const [isLoading, setLoading] = useState(false);
    const [review, setReview] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            const selectedFile = files[0];
            const maxSizeInBytes = 1024 * 1024 * 3; // 3MB

            if (selectedFile.size > maxSizeInBytes) {
                alert("File size must be less than 3MB.");
                return;
            }
            setFile(selectedFile)
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || review === "" || review.length > 180) return;
        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "reviews"), {
                review,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
            });
            if (file) {
                const locationRef = ref(
                    storage,
                    `reviews/${user.uid}-${user.displayName}/${doc.id}`
                );
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }
            setReview("");
            setFile(null);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Form onSubmit={onSubmit}>
            <TextArea
                required
                rows={5}
                maxLength={180}
                onChange={onChange}
                value={review}
                placeholder="Upload your review."
            />
            <AttachFileButton htmlFor="file">
                {file ? "Photo added ✅" : "Add photo"}
            </AttachFileButton>
            <AttachFileInput
                onChange={onFileChange}
                type="file"
                id="file"
                accept="image/*"
            />
            <SubmitBtn
                type="submit"
                value={isLoading ? "Uploading..." : "Upload review"}
            />
        </Form>
    );
}
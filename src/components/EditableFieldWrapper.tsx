import { useState } from "react";
import "./EditableFieldWrapper.scss";
export const EditableFieldWrapper: React.FC<{ children: React.ReactNode, onStopEditing: () => void }> = ({ children, onStopEditing }) => {
    const [editing, setEditing] = useState(false);
    return <div
        className={`editable-field ${editing ? "editing" : ""}`}
        onFocus={() => setEditing(true)}
        onBlur={() => {
            setEditing(false);
            onStopEditing();
        }}>
        {children}
    </div>;
}   
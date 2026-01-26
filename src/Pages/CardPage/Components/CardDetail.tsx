import { useState } from "react";
import { EditableFieldWrapper } from "../../../components/EditableFieldWrapper";
import type { ICard } from "../../../shared/model/card";
import "./CardDetail.scss";
export const CardDetail: React.FC<{ card: ICard, onCardChanged: (card: ICard) => void, onDragEnd: () => void }> = ({ card, onCardChanged, onDragEnd }) => {
    const [managedCard, setManagedCard] = useState<ICard>(card);
    const [dirty, setDirty] = useState<boolean>(false);


    const handleTitleChange = (value: string): void => {
        setDirty(true);
        setManagedCard(c => ({ ...c, title: value }));
    }
    const handleDetailChange = (value: string): void => {
        setDirty(true);
        setManagedCard(c => ({ ...c, detail: value }));
    }

    const handleCardChange = (): void => {
        if (dirty) {
            onCardChanged(managedCard);
            setDirty(false);
        }
    }

    return <div draggable="true" onDragEnd={onDragEnd} className="card-container">
        <div className="card-title">
            <EditableFieldWrapper
                onStopEditing={() => handleCardChange()}>
                <input type="text"
                    value={managedCard.title}
                    onChange={(e => handleTitleChange(e.target.value))} />
            </EditableFieldWrapper>
        </div>
        <div className="card-detail">
            <EditableFieldWrapper
                onStopEditing={() => handleCardChange()}>
                <textarea value={managedCard.detail}
                    onChange={(e => handleDetailChange(e.target.value))} />
            </EditableFieldWrapper>
        </div>
    </div>
}
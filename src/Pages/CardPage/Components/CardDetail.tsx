import type { PrimitiveAtom } from "jotai";
import { useAtom } from "jotai";
import { useState } from "react";
import { EditableFieldWrapper } from "../../../components/EditableFieldWrapper";
import { updateCard } from "../../../shared/api/card-api";
import type { ICard } from "../../../shared/model/card";
import "./CardDetail.scss";
interface ICardDetailProps {
    cardAtom: PrimitiveAtom<ICard>,
    onDragEnd: (c: ICard) => void;
}

export const CardDetail: React.FC<ICardDetailProps> = ({ cardAtom, onDragEnd }) => {
    const [card, setCard] = useAtom(cardAtom);
    const [dirty, setDirty] = useState<boolean>(false);


    const handleTitleChange = (value: string): void => {
        setDirty(true);
        setCard(c => ({ ...c, title: value }));
    }
    const handleDetailChange = (value: string): void => {
        setDirty(true);
        setCard(c => ({ ...c, detail: value }));
    }

    const saveChange = (): void => {
        if (dirty) {
            updateCard(card);
            setDirty(false);
        }
    }

    return <div key={card.id} draggable="true" onDragEnd={() => onDragEnd(card)} className="card-container">
        <div className="card-title">
            <EditableFieldWrapper
                onStopEditing={() => saveChange()}>
                <input type="text"
                    value={card.title}
                    onChange={(e => handleTitleChange(e.target.value))} />
            </EditableFieldWrapper>
        </div>
        <div className="card-detail">
            <EditableFieldWrapper
                onStopEditing={() => saveChange()}>
                <textarea value={card.detail}
                    onChange={(e => handleDetailChange(e.target.value))} />
            </EditableFieldWrapper>
        </div>
    </div>
}
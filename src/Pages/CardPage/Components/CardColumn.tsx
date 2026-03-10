import { useAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { useMemo } from "react";
import { createCard } from "../../../shared/api/card-api";
import { cardMapAtom } from "../../../shared/atoms/cards-atoms";
import type { ICard } from "../../../shared/model/card";
import type { ICardType } from "../../../shared/model/card-type";
import "./CardColumn.scss";
import { CardDetail } from "./CardDetail";

export interface ICardColumnProps {
    type: ICardType;
    onDragEnter?: () => void;
    onDragLeave?: () => void;
    onDragEnd: (c: ICard) => void;
}

export const CardColumn: React.FC<ICardColumnProps> = ({ type, onDragEnter, onDragLeave, onDragEnd }) => {
    const cardsAtom = useMemo(() => splitAtom(focusAtom(cardMapAtom, (o) => o.prop(type.id!))), [type.id]);
    const [cards, dispatch] = useAtom(cardsAtom);
    const handleAddCard = async () => {
        const newCard = await createCard({ title: "New Card", detail: "Card Detail", typeId: type.id! })
        dispatch({
            type: 'insert',
            value: newCard
        });
    }

    return <div className="card-column" onDragEnter={onDragEnter} onDragLeave={onDragLeave}>
        <div className="card-column-header">
            <h3>{type.name}</h3>
            <button className="add-card-button" onClick={handleAddCard}>+</button>
        </div>
        {cards?.map(c =>
            <CardDetail
                cardAtom={c}
                onDragEnd={(c) => onDragEnd(c)}
            />
        )}

    </div>
}
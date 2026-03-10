import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { updateCard } from "../../shared/api/card-api";
import { cardMapAtom, cardTypesAtom, fetchDataAtom } from "../../shared/atoms/cards-atoms";
import type { ICard } from "../../shared/model/card";
import "./CardPage.scss";
import { CardColumn } from "./Components/CardColumn";






export const CardPage: React.FC = () => {
    const [dropTargetTypeId, setDropTargetTypeId] = useState<string | null>(null);
    const [cardTypes] = useAtom(cardTypesAtom);
    const setCardMap = useSetAtom(cardMapAtom);
    const loadData = useSetAtom(fetchDataAtom);

    useEffect(() => {
        loadData();
    }, [loadData]);




    const handleCardDragEnd = (card: ICard): void => {
        if (dropTargetTypeId && dropTargetTypeId !== card.typeId) {
            const oldTypeId = card.typeId;
            card.typeId = dropTargetTypeId;
            setCardMap(cm => {
                const newMap = { ...cm };
                newMap[oldTypeId] = [...newMap[oldTypeId].filter(c => c.id !== card.id)];
                if (!newMap[dropTargetTypeId]) {
                    newMap[dropTargetTypeId] = [];
                }
                newMap[dropTargetTypeId] = [...newMap[dropTargetTypeId], card];
                return newMap;
            });
        }
        setDropTargetTypeId(null);
        updateCard(card);
    }

    const handleDropTargetTypeIdChange = (typeId: string): void => {
        setDropTargetTypeId(typeId);
    }


    return <div className="card-page">
        {cardTypes.map(ct =>
            <CardColumn
                type={ct}
                key={ct.id}
                onDragEnter={() => handleDropTargetTypeIdChange(ct.id!)}
                onDragEnd={(c) => handleCardDragEnd(c)} >
            </CardColumn>
        )}
    </div>
}
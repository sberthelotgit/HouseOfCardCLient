import { useEffect, useState } from "react";
import { createCard, getCards, getCardTypes, updateCard } from "../../shared/api/card-api";
import type { ICard } from "../../shared/model/card";
import type { ICardType } from "../../shared/model/card-type";
import "./CardPage.scss";
import { CardColumn } from "./Components/CardColumn";
import { CardDetail } from "./Components/CardDetail";

type CardMap = Record<string, ICard[]>

const insertCard = (map: CardMap, card: ICard): CardMap => {
    if (!map[card.typeId!]) {
        map[card.typeId!] = [];
    }
    map[card.typeId!].push(card);
    return map;
}

const createCardMap = (card: ICard[]): CardMap => {
    return card.reduce(insertCard, {} as CardMap);
}

export const CardPage: React.FC = () => {
    const [cardTypes, setCardTypes] = useState<ICardType[]>([]);
    const [cardMap, setCardMap] = useState<CardMap>({});
    const [dropTargetTypeId, setDropTargetTypeId] = useState<string | null>(null);

    useEffect(() => {
        getCardTypes().then(fetchedCardTypes => setCardTypes(fetchedCardTypes)).then(() =>
            getCards()).then(fetchedCards => setCardMap(createCardMap(fetchedCards)))
    }, [])

    const handleAddCard = async (forTypeId: string) => {
        const newCard = await createCard({ title: "New Card", detail: "Card Detail", typeId: forTypeId })
        setCardMap(cm => insertCard({ ...cm, [forTypeId]: [...cm[forTypeId]] }, newCard))

    }

    const handleCardChange = (card: ICard): void => {
        updateCard(card);
    }

    const handleCardDragEnd = (card: ICard): void => {
        console.log('Hello  ', dropTargetTypeId)
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
        console.log('Hello  ', dropTargetTypeId)
        setDropTargetTypeId(typeId);
    }


    return <div className="card-page">
        {cardTypes.map(ct =>
            <CardColumn
                key={ct.id}
                name={ct.name}
                onAddCard={() => handleAddCard(ct.id!)}
                onDragEnter={() => handleDropTargetTypeIdChange(ct.id!)} >

                {cardMap[ct.id!]?.map(c =>
                    <CardDetail
                        key={c.id} card={c}
                        onCardChanged={handleCardChange}
                        onDragEnd={() => handleCardDragEnd(c)} />
                )}

            </CardColumn>
        )}
    </div>
}
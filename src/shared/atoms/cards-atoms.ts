import { atom } from "jotai";
import { getCards, getCardTypes } from "../api/card-api";
import type { ICard } from "../model/card";
import type { ICardType } from "../model/card-type";

type CardMap = Record<string, ICard[]>


export const insertCard = (map: CardMap, card: ICard): CardMap => {
    if (!map[card.typeId!]) {
        map[card.typeId!] = [];
    }
    map[card.typeId!].push(card);
    return map;
}

export const createCardMap = (card: ICard[]): CardMap => {
    return card.reduce(insertCard, {} as CardMap);
}

export const cardTypesAtom = atom<ICardType[]>([]);
export const cardMapAtom = atom<CardMap>({});

export const fetchDataAtom = atom(
    null,
    async (_get, set) => {
        const cardTypes = await getCardTypes();
        const cards = await getCards();

        set(cardTypesAtom, cardTypes);
        set(cardMapAtom, createCardMap(cards));
    }
);
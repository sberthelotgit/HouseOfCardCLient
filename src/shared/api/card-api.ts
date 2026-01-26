import type { ICard } from "../model/card";
import type { ICardType } from "../model/card-type";

const cardEndpoint = 'http://192.168.2.63:5000/card';

export const getCards = async (): Promise<ICard[]> => {
    const response = await fetch(cardEndpoint);
    const data = await response.json();
    return data as ICard[];
}

export const createCard = async (cardInfo: ICard): Promise<ICard> => {
    const response = await fetch(cardEndpoint, { method: 'POST', body: JSON.stringify(cardInfo), headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();
    return data as ICard;
}

export const updateCard = async (cardInfo: ICard): Promise<ICard> => {
    const response = await fetch(`${cardEndpoint}/${cardInfo.id}`, { method: 'PUT', body: JSON.stringify(cardInfo), headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();
    return data as ICard;
}


export const getCardTypes = async (): Promise<ICardType[]> => {
    const response = await fetch(cardEndpoint + "/type");
    const data = await response.json();
    return data as ICardType[];
}
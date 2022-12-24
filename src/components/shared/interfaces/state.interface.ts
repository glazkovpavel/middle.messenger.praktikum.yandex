import {IUser} from "./user.interface";
import {ChatInfo} from "./chat-ifo.interface";
import {Message} from "./message.interface";

export interface IState {
  user: IUser;
  chats: ChatInfo[];
  messages: Record<number, Message[]>;
  selectedChat?: number;
}
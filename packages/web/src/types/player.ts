import { User } from "next-auth";

export interface Player extends User {
    isHost?: boolean;
}
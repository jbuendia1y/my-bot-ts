import { Player } from "discord-player";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, Command>,
        player : Player
    }

    export interface Command{
        name : string,
        description : string,
        excute(message:Message , args:string[]) : void;
    }
}
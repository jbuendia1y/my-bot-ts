import { Player } from "discord-player";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, Command>,
        player : Player,
        prefix : string
    }

    export interface Command{
        name : string,
        description : string,
        excute(client:Client ,message:Message , args?:string[]) : void;
    }
}
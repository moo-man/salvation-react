import { Importance } from "./types"

export class Note {
    content = "";
    importance : Importance = Importance.None;
    date = ""
    campaign : string | undefined = undefined
}
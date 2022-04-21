import { Importance, NoteType } from "./types"

export class Note {
    content = "";
    importance : Importance = Importance.None;
    date = ""
    campaign : string | undefined = undefined
    active? : boolean
    type: NoteType = NoteType.Normal
    distance? : number = 0
}


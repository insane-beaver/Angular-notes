export class Note {
  public id!: number;
  public title!: string;
  public body!: string;
}

export class Comment {
  public id!: number;
  public noteId!: number;
  public author!: string;
  public content!: string;
  public created_at!: string;
}

export class Inf {
  public static saveType = 0; //0-LocalSt   1-Firebase
  public static touchScreen = 0; //0-without 1 - with
}

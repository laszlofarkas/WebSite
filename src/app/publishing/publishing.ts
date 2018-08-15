export class Publishing {
  id: String;
  content: Content;
  tags: Array<string>;
  status: string;
  channels: Array<Object>;
  scheduled: Date;
  geo: Object;
}

export class Content {
  message: string;
  id: string;
  network: string;
  postType: string;
  media: Media;
}

export class Media {
  fileName: string;
  url: string;
  content: string;
}

export class Publishing {
  id: String;
  content: Content;
  tags: Array<String>;
  status: String;
  channels: Array<Object>;
  scheduled: Date;
  geo: Object;
}

export class Content {
  message: String;
  id: String;
  network: String;
  postType: String;
  media: Media;
}

export class Media {
  filename: String;
  url: String;
  content: String;
}

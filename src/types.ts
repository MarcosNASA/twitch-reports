export type ViewerType = "follower" | "subscriber";

export type Viewer = {
  id: number;
  name: string;
  age: number;
  followedAt: string;
  subscribedAt: string | null;
  sentMessages: number;
  country: string;
  type: ViewerType;
}

export type Stream = {
  id: number;
  date: string;
  duration: number;
  views: number;
  likes: number;
  comments: number;
  viewerIds: number[];
  tagIds: number[];
}

export type Tag = {
  id: number;
  topic: string;
}

export type Mod = {
  id: number;
  name: string;
}

export type Clip = {
  id: number
  title: string
  date: string
  likes: number
  comments: number
  plays: number
  duration: number
  followerId: number
  streamId: number
}

export type Timeout = {
  id: number;
  streamId: number;
  followerId: number;
  time: number;
  modId: number;
}

export type Afordin = {
  viewers: Viewer[];
  tags: Tag[];
  streams: Stream[];
  timeouts: Timeout[]
  mods: Mod[]
  clips: Clip[]
}
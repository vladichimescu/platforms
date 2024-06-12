const WIKI_PARAMS = {
  action: "query",
  list: "search",
  origin: "*",
  format: "json",
}

const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
}

const WEB_SOCKET_EVENTS = {
  CHAT: "chat",
  AUTHENTICATE: "authenticate",
}

export { WIKI_PARAMS, GENDERS, WEB_SOCKET_EVENTS }

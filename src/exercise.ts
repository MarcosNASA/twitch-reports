import { Afordin } from "./types";

export const getStats = (data: Afordin) => {
  return {
    statistics: {
      viewers: 0,
      tags: 0,
      streams: 0,
      mods: 0,
      clips: 0,
      followers: 0,
      subscribers: 0,
      uniqueCountries: [],
    },
    
    streams: {
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      totalDuration: 0,
    },

    viewers: {
    },
    
    moderation: {
      modWhoTimedoutMoreTimes: "",
      modWhoTimedoutLessTimes: "",
      modWhoTimedoutMoreOften: "",
      modWhoTimedoutLessOften: "",
    },
  }
} 
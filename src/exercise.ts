import { Afordin } from "./types";

export const getStats = (data: Afordin) => {
  return {
    statistics: {
      // Number of viewers
      viewers: 0,
      // Number of viewers who are followers
      followers: 0,
      // Number of viewers who are subscribers
      subscribers: 0,
      // Number of tags
      tags: 0,
      // Number of streams
      streams: 0,
      // Number of mods
      mods: 0,
      // Number of clips
      clips: 0,
      // List of unique countries
      uniqueCountries: [],
    },
    
    streams: {
      // Total number of views
      totalViews: 0,
      // Total number of likes
      totalLikes: 0,
      // Total number of comments
      totalComments: 0,
      // Total duration
      totalDuration: 0,
    },

    viewers: {
      age: {
        // Number of viewers who are younger than 20
        youngerThan20: 0,
        // Number of viewers who are in their 20s
        inTheir20s: 0,
        // Number of viewers who are in their 30s
        inTheir30s: 0,
        // Number of viewers who are in their 40s
        inTheir40s: 0,
        // Number of viewers who are older than 40
        olderThan40: 0,
        // Oldest viewer
        oldest: "",
        // Youngest viewer
        youngest: "",
      },
      followage: {
        // Viewer who has followed for the longest time
        oldest: "",
        // Viewer who has followed for the shortest time
        youngest: "",
      }
    },
    
    moderation: {
      // Name of the mod who timed out uses for the longer period of time
      modWhoTimedoutMoreTime: "",
      // Name of the mod who timed out uses for the shorter period of time
      modWhoTimedoutLessTime: "",
      // Name of the mod who made more timeouts (regardless of the time)
      modWhoTimedoutMoreOften: "",
      // Name of the mod who made less timeouts (regardless of the time)
      modWhoTimedoutLessOften: "",
    },
  }
} 
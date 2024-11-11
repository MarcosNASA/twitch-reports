import { expect, it } from 'vitest'

import { data } from '../src/data'
import { getStats } from '../src/solution'

it('data', () => {
  expect(
    getStats(
      data,
    ),
  ).toStrictEqual({
    statistics: {
      viewers: 80,
      tags: 15,
      streams: 208,
      mods: 7,
      clips: 30,
      followers: 45,
      subscribers: 35,
      uniqueCountries: [
        'Guatemala',
        'Costa Rica',
        'Honduras',
        'Chile',
        'Puerto Rico',
        'Uruguay',
        'Colombia',
        'República Dominicana',
        'México',
        'Ecuador',
        'Paraguay',
        'Cuba',
        'Bolivia',
        'Argentina',
        'Venezuela',
        'España',
        'El Salvador',
        'Nicaragua',
        'Perú',
      ],
    },
    streams: {
      totalComments: 10670,
      totalDuration: 30245,
      totalLikes: 51992,
      totalViews: 2539,
    },
    moderation: {
      modWhoTimedoutMoreTime: 'aitor',
      modWhoTimedoutLessTime: 'jp',
      modWhoTimedoutMoreOften: 'jp',
      modWhoTimedoutLessOften: 'jp',
    },
    "viewers": {
      "age": {
        "youngerThan20": 3,
        "inTheir20s": 0,
        "inTheir30s": 24,
        "inTheir40s": 23,
        "olderThan40": 30,
        "oldest": {
          "age": 50,
          "country": "Costa Rica",
          "followedAt": "2022-12-06",
          "id": 19,
          "name": "rafa",
          "sentMessages": 601,
          "subscribedAt": null,
          "type": "follower",
        },
        "youngest": {
          "age": 18,
          "country": "Honduras",
          "followedAt": "2024-08-03",
          "id": 44,
          "name": "stephenmack",
          "sentMessages": 484,
          "subscribedAt": "2024-08-08",
          "type": "subscriber",
        },
      },
      "followage": {
        "oldest": {
          "age": 26,
          "country": "Argentina",
          "followedAt": "2022-11-16",
          "id": 46,
          "name": "gmarsh",
          "sentMessages": 853,
          "subscribedAt": null,
          "type": "follower",
        },
        "youngest": {
          "age": 31,
          "country": "Costa Rica",
          "followedAt": "2024-10-24",
          "id": 70,
          "name": "dana35",
          "sentMessages": 515,
          "subscribedAt": "2024-05-17",
          "type": "subscriber",
        },
      },
    },
  })
})

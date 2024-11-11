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
    viewers: {
    },
    moderation: {
      modWhoTimedoutMoreTimes: 'aitor',
      modWhoTimedoutLessTimes: 'jp',
      modWhoTimedoutMoreOften: 'jp',
      modWhoTimedoutLessOften: 'jp',
    },
  })
})

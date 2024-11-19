import { Afordin } from './types'

const groupBy = <ItemType extends object>(
  array: ItemType[],
  key: (item: ItemType) => PropertyKey,
) =>
  array.reduce((groupedBy, item) => {
    const groupingKey = key(item)
    const groupedItems = groupedBy[groupingKey] ?? []
    groupedBy[groupingKey] = [...groupedItems, item]
    return groupedBy
  }, {} as { [key in PropertyKey]: ItemType[] })

const keyBy = <ItemType extends object>(
  array: ItemType[],
  key: (item: ItemType) => PropertyKey,
) =>
  array.reduce((groupedBy, item) => {
    const groupingKey = key(item)
    groupedBy[groupingKey] = item
    return groupedBy
  }, {} as { [key in PropertyKey]: ItemType })

const modWhoTimedoutMoreTime = (data: Afordin) => {
  const timeoutsByMod = groupBy(data.timeouts, (timeout) => timeout.modId)
  const totalTimeoutByMod = Object.entries(timeoutsByMod).map(
    ([modId, timeouts]) => {
      return {
        id: modId,
        timeout: timeouts.reduce(
          (totalTiemout, timeout) => totalTiemout + timeout.time,
          0,
        ),
      }
    },
  )
  const modsById = groupBy(data.mods, (mod) => mod.id)
  const sortedTimeoutsByMod = totalTimeoutByMod.toSorted(
    (a, b) => b.timeout - a.timeout,
  )
  const [modWhoTimedoutMoreTime] = sortedTimeoutsByMod
  return modsById[modWhoTimedoutMoreTime.id].at(0)?.name
}

const modWhoTimedoutLessTime = (data: Afordin) => {
  const timeoutsByMod = groupBy(data.timeouts, (timeout) => timeout.modId)
  const totalTimeoutByMod = Object.entries(timeoutsByMod).map(
    ([modId, timeouts]) => {
      return {
        id: modId,
        timeout: timeouts.reduce(
          (totalTiemout, timeout) => totalTiemout + timeout.time,
          0,
        ),
      }
    },
  )
  const modsById = groupBy(data.mods, (mod) => mod.id)
  const sortedTimeoutsByMod = totalTimeoutByMod.toSorted(
    (a, b) => a.timeout - b.timeout,
  )
  const [modWhoTimedoutLessTime] = sortedTimeoutsByMod
  return modsById[modWhoTimedoutLessTime.id].at(0)?.name
}

const modWhoTimedoutMoreOften = (data: Afordin) => {
  const timeoutsByMod = groupBy(data.timeouts, (timeout) => timeout.modId)
  const totalTimeoutByMod = Object.entries(timeoutsByMod).map(
    ([modId, timeouts]) => {
      return {
        id: modId,
        timeout: timeouts.length,
      }
    },
  )
  const modsById = groupBy(data.mods, (mod) => mod.id)
  const sortedTimeoutsByMod = totalTimeoutByMod.toSorted(
    (a, b) => a.timeout - b.timeout,
  )
  const [modWhoTimedoutMoreOften] = sortedTimeoutsByMod
  return modsById[modWhoTimedoutMoreOften.id].at(0)?.name
}

const modWhoTimedoutLessOften = (data: Afordin) => {
  const timeoutsByMod = groupBy(data.timeouts, (timeout) => timeout.modId)
  const totalTimeoutByMod = Object.entries(timeoutsByMod).map(
    ([modId, timeouts]) => {
      return {
        id: modId,
        timeout: timeouts.length,
      }
    },
  )
  const modsById = groupBy(data.mods, (mod) => mod.id)
  const sortedTimeoutsByMod = totalTimeoutByMod.toSorted(
    (a, b) => a.timeout - b.timeout,
  )
  const [modWhoTimedoutLessOften] = sortedTimeoutsByMod
  return modsById[modWhoTimedoutLessOften.id].at(0)?.name
}

const mostTimedoutViewer = (data: Afordin) => {
  const timeoutsByViewerId = groupBy(
    data.timeouts,
    (timeout) => timeout.followerId,
  )
  const viewersWithTimeouts = data.viewers.map((viewer) => {
    const viewerTimeouts = timeoutsByViewerId[viewer.id] ?? []
    return {
      viewer,
      timeouts: viewerTimeouts,
    }
  })
  const sortedTimeoutsByViewer = viewersWithTimeouts.toSorted(
    (a, b) => a.timeouts.length - b.timeouts.length,
  )
  return sortedTimeoutsByViewer.at(0)
}

const longestTimedoutViewer = (data: Afordin) => {
  const viewersWithTimeouts = data.viewers.map((viewer) => {
    const viewerTimeouts = data.timeouts.filter(
      (timeout) => timeout.followerId === viewer.id,
    )
    return {
      viewer,
      timeoutDuration: viewerTimeouts.reduce(
        (timeoutDuration, timeout) => timeoutDuration + timeout.time,
        0,
      ),
    }
  })
  const sortedTimeoutsByViewer = viewersWithTimeouts.toSorted(
    (a, b) => b.timeoutDuration - a.timeoutDuration,
  )
  return sortedTimeoutsByViewer.at(0)
}

const mostHatedViewerByMod = (mod: Afordin['mods'][number], data: Afordin) => {
  const modTimeouts = data.timeouts.filter(
    (timeout) => timeout.modId === mod.id,
  )
  const viewersById = keyBy(data.viewers, (viewer) => viewer.id)
  const modTimeoutsByViewerId = Object.fromEntries(
    Object.entries(groupBy(modTimeouts, (timeout) => timeout.followerId)).map(
      ([viewerId, timeouts]) => {
        return [viewerId, { viewer: viewersById[viewerId], timeouts }]
      },
    ),
  )
  const sortedModTimeoutsByViewer = Object.values(
    modTimeoutsByViewerId,
  ).toSorted((a, b) => a.timeouts.length - b.timeouts.length)
  const mostBannedViewer = sortedModTimeoutsByViewer.at(0)
  if (!mostBannedViewer) return null
  return { ...mostBannedViewer.viewer, timeouts: mostBannedViewer.timeouts }
}
const mostHatedViewerByMods = (data: Afordin) =>
  Object.fromEntries(
    data.mods.map((mod) => [mod.name, mostHatedViewerByMod(mod, data)]),
  )

export const getStats = (data: Afordin) => {
  return {
    statistics: {
      viewers: data.viewers.length,
      tags: data.tags.length,
      streams: data.streams.length,
      mods: data.mods.length,
      clips: data.clips.length,
      followers: data.viewers.reduce(
        (acc, viewer) => acc + (viewer.type === 'follower' ? 1 : 0),
        0,
      ),
      subscribers: data.viewers.reduce(
        (acc, viewer) => acc + (viewer.type === 'subscriber' ? 1 : 0),
        0,
      ),
      uniqueCountries: [
        ...new Set(data.viewers.map((viewer) => viewer.country)),
      ],
    },

    streams: {
      totalViews: data.streams.reduce(
        (totalViews, stream) => totalViews + stream.views,
        0,
      ),
      totalLikes: data.streams.reduce(
        (totalLikes, stream) => totalLikes + stream.likes,
        0,
      ),
      totalComments: data.streams.reduce(
        (totalComments, stream) => totalComments + stream.comments,
        0,
      ),
      totalDuration: data.streams.reduce(
        (totalDuration, stream) => totalDuration + stream.duration,
        0,
      ),
    },

    viewers: {
      age: {
        youngerThan20: data.viewers.filter((viewer) => viewer.age < 20).length,
        inTheir20s: data.viewers.filter(
          (viewer) => viewer.age < 20 && viewer.age >= 20,
        ).length,
        inTheir30s: data.viewers.filter(
          (viewer) => viewer.age < 30 && viewer.age >= 20,
        ).length,
        inTheir40s: data.viewers.filter(
          (viewer) => viewer.age < 40 && viewer.age >= 30,
        ).length,
        olderThan40: data.viewers.filter((viewer) => viewer.age >= 40).length,
        oldest: data.viewers.toSorted((a, b) => b.age - a.age).at(0),
        youngest: data.viewers.toSorted((a, b) => a.age - b.age).at(0),
      },
      followage: {
        oldest: data.viewers
          .toSorted((a, b) => (a.followedAt >= b.followedAt ? 1 : -1))
          .at(0),
        youngest: data.viewers
          .toSorted((a, b) => (a.followedAt >= b.followedAt ? -1 : 1))
          .at(0),
      },
    },

    moderation: {
      modWhoTimedoutMoreTime: modWhoTimedoutMoreTime(data),
      modWhoTimedoutLessTime: modWhoTimedoutLessTime(data),
      modWhoTimedoutMoreOften: modWhoTimedoutMoreOften(data),
      modWhoTimedoutLessOften: modWhoTimedoutLessOften(data),
      mostTimedoutViewer: mostTimedoutViewer(data),
      longestTimedoutViewer: longestTimedoutViewer(data),
      mostHatedViewerByMods: mostHatedViewerByMods(data),
    },
  }
}

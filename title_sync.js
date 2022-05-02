let VIDEO_ID = '<your_video_id_here'

/**
 * The main function to sync the view count to the video title.
 * To be executed on a 1 minute trigger.
 */
function main() {
  // Sync view count to title every 7.35 minutes, which is the YouTube API limit.
  for(let i = 0; i < 30; i++) {
    updateVideoTitle(VIDEO_ID, getViewCount(VIDEO_ID));
    Utilities.sleep(441000); // Sleep for 441 seconds.
  }
}

/**
 * Retrieves the current number of views on the video.
 */
function getViewCount(videoId) {
  const result = YouTube.Videos.list('snippet,statistics',{id: videoId});
  return result.items[0].statistics.viewCount;
}

/**
 * Updates the video title with a given view count.
 */
function updateVideoTitle(videoId, viewCount) {
  var resource = {
    id: videoId,
    snippet: {
      title: `This video has ${viewCount} views`,
      categoryId: 22
    }
  };
  YouTube.Videos.update(resource, 'snippet');
}

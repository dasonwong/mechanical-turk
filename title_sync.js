let VIDEO_ID = '<your_video_id_here'

/**
 * The main function to sync the view count to the video title.
 * To be executed on a 10 minute trigger to avoid YouTube API limits.
 */
function main() {
  updateVideoTitle(VIDEO_ID, getViewCount(VIDEO_ID));
}

/**
 * Retrieves the current number of views on the video.
 */
function getViewCount(videoId) {
  const result = YouTube.Videos.list('snippet,statistics', {id: videoId});
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
      description: '<your_video_description_here>',
      categoryId: 22
    }
  };
  YouTube.Videos.update(resource, 'snippet');
}

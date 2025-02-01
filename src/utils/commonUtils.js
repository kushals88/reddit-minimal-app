const timeAgo = (utcTime) => {
    const now = new Date();
    const time = new Date(utcTime*1000);
    const diffInSeconds = Math.floor((now-time) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ]

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
          return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-count, interval.label);
        }
      }

    return 'just now';

}

const numFormatter = (count) => {
  if (count >= 1000){
    const formattedCount =  (count/1000).toFixed(1);
    return formattedCount.endsWith('.0') ? formattedCount.slice(0,-2) + 'k' : formattedCount + 'k';
  }
  return count.toString();
}

export {numFormatter, timeAgo}
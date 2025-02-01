# Reddit Minimal app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a react single page application I created to practice front-end web development.

## 🚀 Features
- Fetches and displays read-only posts from the Reddit JSON API.
- Displays 10 posts at a time (default: “popular” subreddit).
- It handle rendering image for posts with single image.
- Users can fetch comments for a post (limited to 25 comments).
- Allows users to select a subreddit from the right panel to view relevant posts.
- Provides a search/filter option to refine the current listings.
- Error handling: The Reddit JSON API limits requests to 10 per minute. If the rate limit is exceeded, a message and “Try Again” button appear on the UI.

## 🛠️ Tools and Technologies
- React (Frontend framework)
- Redux (State management)
- JavaScript, HTML, CSS
- Axios (For API requests)
- Media Queries (For responsive design)

## 📦 Installation
1. Clone the repository:
`git clone https://github.com/kushals88/reddit-minimal-app.git`
`reddit-minimal-app`

2. Install dependancies
`npm install`

## 🚀 Usage
`npm start`

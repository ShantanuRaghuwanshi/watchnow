# Video Streaming Website

This project is a video streaming website that allows users to watch movies and access their metadata. The metadata is scraped from the IMDB site, and videos are played using the Vidsrc video player.

## Project Structure

```
video-streaming-website
├── src
│   ├── index.html        # Main HTML document for the website
│   ├── styles
│   │   └── style.css     # CSS styles for the website
│   ├── scripts
│   │   └── app.js        # Main JavaScript file for functionality
│   └── utils
│       └── scraper.js     # Functions for scraping movie metadata
├── package.json           # npm configuration file
├── README.md              # Project documentation
└── .gitignore             # Files to be ignored by version control
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd video-streaming-website
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm start
   ```

## Usage Guidelines

- Open `src/index.html` in your web browser to access the video streaming website.
- The application will fetch movie metadata from IMDB and display it on the website.
- Users can select a movie to watch, and the video will be played using the Vidsrc player.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
# Fame Track

Responsive music, entertainment, fashion and sports site, with a live news feed, search, saved stories, a Story Studio editor, and a browser-only community discussion prototype.

The Blog page lets a visitor write and delete personal posts. Blog posts are saved only in that browser's local storage; they are not shared with other visitors until a shared database/server is added.

The Community page supports topic posts, replies and deleting a topic. It stores them in the current browser's local storage, so posts are not shared with other visitors or devices. A shared community needs a hosted database/server plus basic moderation tools before it is ready for public discussion.

The site also includes a Sports page with links to official BBC Sport coverage and its RSS feed directory.

## Sources for music and fashion

- **Music:** [Music-News.com RSS feeds](https://www.music-news.com/rss-feeds). Its terms say a third-party website may use only an article title and its first full sentence, with a visible “Read the full article at Music-News.com” link to the original article. It prohibits images other than its logo and says its content cannot be republished. Ask the publisher before using it in an automated public site.
- **Fashion:** [Fibre2Fashion RSS feeds](https://www.fibre2fashion.com/news/rss/rss.aspx), including its Fashion News feed at <https://feeds.feedburner.com/fibre2fashion/fashion-news>. Its RSS page limits use to the feed itself and says to preserve its news-provider credit. Check its current terms before putting feed content on a public site.
- **Sports:** [BBC Sport RSS feed directory](https://support.bbc.co.uk/platform/feeds/SportFeeds.htm) lists feeds by sport. The listed examples are UK edition feeds. The Sports page links readers to BBC Sport and its feed directory. BBC RSS terms require the feed to remain unchanged and say business use needs permission or a licence.

These sources have different rules. Do not run AI rewriting or merge their feed text into a different format unless the publisher allows it. Linking readers to the original story is the safer starting point; it does not itself grant permission to republish story text.

## Start the site

Requires Node.js 18 or newer. In this folder run:

```sh
node server.js
```

Then open <http://localhost:3000>. Keep the server running: it fetches news at startup and every 30 minutes. Use **Refresh news** to request an update. Open articles link to their publishers. The feed searches regional editions from the US, UK, Canada, Australia, India, South Africa, Brazil and Japan. Brazil and Japan searches use local languages; the other editions search English news. TMZ results are excluded until there is clear permission to use its content in an automated feed.

## Host it so your computer can be off

**Source-use note:** The current automatic feed reads and reformats Google News RSS results. Google's [Google News terms](https://www.google.com/intl/en_us/terms_google_news.html) restrict automated monitoring/copying and reformatting/display of its results. Showing a Google News credit does not grant permission. Keep this prototype private until the feed is changed to a source/API whose terms permit this use, or you have permission.

The GitHub Pages workflow in `.github/workflows/host-and-update.yml` publishes the static website and refreshes `news.json` on a 30-minute schedule with GitHub Actions. It searches the eight regional editions listed above and includes up to two stories per category per edition. Scheduled jobs can start late during busy periods. Once deployed, Fame Track keeps updating while your computer and VS Code are closed. The hosted site does not need `node server.js` running.

To use it, create a GitHub repository for the **contents of this Fame Track folder** (so `.github` is at the repository root), upload the files, and in the repository settings choose **Pages → GitHub Actions**. GitHub Pages on the Free plan requires a public repository, so the code would be visible to anyone. After upload, the Actions workflow publishes the site and shows its address in the Pages settings. This workspace is not connected to a GitHub repository yet, so the site has not been published.

For AI news summaries, add `OPENAI_API_KEY` under **Settings → Secrets and variables → Actions → New repository secret**. Keep the key out of the files you upload. Each run summarizes up to two new stories per section; summaries are saved so unchanged stories are not sent to AI again. Other cards use their RSS descriptions. The RSS refresh still works without the key. OpenAI API use may incur charges.

## Enable AI summaries

The news feed will still update without AI, using the RSS description when available. To generate AI summaries, set an OpenAI API key in the server environment before starting:

```sh
export OPENAI_API_KEY="your-key"
node server.js
```

The key stays on the server. You can set `OPENAI_MODEL` to choose a model; the default is `gpt-6.2-astra`. The server summarizes RSS headlines and descriptions, and shows the original article link for readers. The Story Studio can also summarize source text that you provide. Review AI text before relying on it.

## Content storage

Fetched news is held in server memory and refreshed every 30 minutes; if the server restarts, it fetches again. Stories created in Story Studio and saved articles are stored in the current browser's local storage and are not shared between visitors.

# EASE-Robotics.github.io

Open items are tracked in [TODO.md](TODO.md).

The EASE Robotics Competition website, served by GitHub Pages at <https://ease-robotics.github.io>.

It's plain HTML, CSS, and JavaScript, so there's no build step. Anything pushed to `main` goes live within a minute or two.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `tutorials.html` | PDF guides and video tutorials |
| `kit.html` | Starter kit contents and the kit request button |
| `compete.html` | How to participate: register team → request kit → submit video (hidden from the navbar until a form link is set) |
| `rankings.html` | Leaderboard, built from `data/rankings.json` |

The navbar and footer are shared. They live in `assets/js/site.js`, and styles are in `assets/css/style.css`.

## Common edits

### Connect the Google Forms
Paste each form's share link into `assets/js/config.js`:

```js
window.EASE_FORMS = {
  registerTeam: "https://forms.gle/...",
  requestKit:   "https://forms.gle/...",
  submitVideo:  "https://forms.gle/...",
};
```

Anything that depends on a form stays hidden until that form has a link: the Compete page steps, the navbar's Compete link and "Get started" button, the kit request section, and the home page's "Register your team" button. While no form has a link, the Compete page says registration opens soon. To mark more content this way, see the comment above `wireForms()` in `assets/js/site.js`.

Suggested form fields:
- **Register team**: team name, school or organization, grade level (Middle School (6–8) / High School (9–12) / Mixed), number of members (1–10), contact name, contact email
- **Request kit**: team name, contact email, shipping address. To cap the number of kits, turn off "Accepting responses" once you reach the limit.
- **Submit video**: team name, contact email, YouTube or Google Drive URL, short description

### Update the leaderboard
Edit `data/rankings.json`. Use `"score": null` for a team whose video hasn't been graded yet. Graded teams are sorted by score, and ungraded teams are listed at the bottom with "—".

```json
[
  { "team": "Circuit Breakers", "school": "Lincoln MS", "score": 96 },
  { "team": "Rookie Bots", "school": "Wilson HS", "score": null }
]
```

An empty list (`[]`) shows "No submissions yet".

### Publish tutorial PDFs
Put the file in `assets/pdf/`. Then in `tutorials.html`, replace that card's disabled button with the link shown in the HTML comment above it.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Use a local server rather than opening the files directly: the leaderboard loads its JSON with `fetch`, which doesn't work from `file://`.

# TODO

## Robot Olympics thank-you banner (home page)
- [x] Replace the dummy feedback form link in `index.html` with the real one
- [ ] Remove the `THANK-YOU BANNER` section from `index.html` once feedback collection is over

## Google Forms (sign-up, kits, submissions)
Everything that depends on these forms is hidden on the live site until its link is filled in, so each form can go live on its own.

- [ ] Create the **team registration** form: team name, school or organization, grade level (Middle School (6–8) / High School (9–12) / Mixed), number of members (1–10), contact name, contact email
- [ ] Create the **kit request** form: team name, contact email, shipping address. Turn off "Accepting responses" once all kits are claimed.
- [ ] Create the **video submission** form: team name, contact email, YouTube or Google Drive URL, short description
- [ ] Paste each form's share link into `assets/js/config.js`, then commit and push. The matching buttons, steps, and the Compete page show up automatically.

## Content
- [ ] Add the tutorial PDFs to `assets/pdf/` and switch their buttons on in `tutorials.html` (instructions are in the HTML comment above each button)
- [ ] Add links for the video tutorials once they're recorded (`tutorials.html`)
- [ ] Post scores in `data/rankings.json` as videos are graded

## Later
- [ ] Replace Google Forms with a real backend (accounts, team dashboard, admin grading). The original Next.js app is in `mindful_robotics/web`.

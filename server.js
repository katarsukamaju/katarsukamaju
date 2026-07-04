const express = require('express');
const cors = require('cors');
const { Octokit } = require('@octokit/rest');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const OWNER = process.env.GITHUB_OWNER || 'katarsukamaju';
const REPO = process.env.GITHUB_REPO || 'katarsukamaju';
const BRANCH = 'main';

app.post('/api/github-commit', async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(401).json({ success: false, error: 'GITHUB_TOKEN not configured' });
  }

  const octokit = new Octokit({ auth: token });

  try {
    const { type } = req.body;

    if (type === 'member') {
      const { name, division, position, slug, photo } = req.body;
      const { data: currentMembers } = await octokit.repos.getContent({
        owner: OWNER, repo: REPO, path: 'public/data/members.json', ref: BRANCH
      });
      const content = JSON.parse(Buffer.from(currentMembers.content, 'base64').toString());
      const existingDiv = content.find(d => d.division === division);
      if (existingDiv) {
        existingDiv.members.push({ name, position, slug });
      } else {
        content.push({ id: content.length + 1, division, members: [{ name, position, slug }] });
      }
      await octokit.repos.createOrUpdateFileContents({
        owner: OWNER, repo: REPO, path: 'public/data/members.json',
        message: `Add member: ${name}`,
        content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
        sha: currentMembers.sha, branch: BRANCH
      });
      if (photo) {
        try {
          const { data: existingPhoto } = await octokit.repos.getContent({
            owner: OWNER, repo: REPO, path: `public/storage/profile/${slug}.jpg`, ref: BRANCH
          });
          await octokit.repos.createOrUpdateFileContents({
            owner: OWNER, repo: REPO, path: `public/storage/profile/${slug}.jpg`,
            message: `Add photo: ${slug}`,
            content: photo,
            sha: existingPhoto.sha, branch: BRANCH
          });
        } catch {
          await octokit.repos.createOrUpdateFileContents({
            owner: OWNER, repo: REPO, path: `public/storage/profile/${slug}.jpg`,
            message: `Add photo: ${slug}`,
            content: photo,
            branch: BRANCH
          });
        }
      }
      return res.json({ success: true });
    }

    if (type === 'settings') {
      const { whatsapp, instagram, email } = req.body;
      const { data: currentSettings } = await octokit.repos.getContent({
        owner: OWNER, repo: REPO, path: 'public/data/settings.json', ref: BRANCH
      });
      const settings = JSON.parse(Buffer.from(currentSettings.content, 'base64').toString());
      if (whatsapp) settings.whatsapp = whatsapp;
      if (instagram) settings.instagram = instagram;
      if (email) settings.email = email;
      await octokit.repos.createOrUpdateFileContents({
        owner: OWNER, repo: REPO, path: 'public/data/settings.json',
        message: 'Update web settings',
        content: Buffer.from(JSON.stringify(settings, null, 2)).toString('base64'),
        sha: currentSettings.sha, branch: BRANCH
      });
      return res.json({ success: true });
    }

    return res.status(400).json({ success: false, error: 'Invalid type' });
  } catch (error) {
    console.error('GitHub API error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

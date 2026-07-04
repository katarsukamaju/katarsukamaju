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

const getFile = async (octokit, filePath) => {
  try {
    const { data } = await octokit.repos.getContent({ owner: OWNER, repo: REPO, path: filePath, ref: BRANCH });
    return { content: JSON.parse(Buffer.from(data.content, 'base64').toString()), sha: data.sha };
  } catch {
    return { content: [], sha: null };
  }
};

const saveFile = async (octokit, filePath, content, sha, message) => {
  await octokit.repos.createOrUpdateFileContents({
    owner: OWNER, repo: REPO, path: filePath,
    message,
    content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
    sha, branch: BRANCH
  });
};

const saveImage = async (octokit, imagePath, base64) => {
  try {
    const { data } = await octokit.repos.getContent({ owner: OWNER, repo: REPO, path: imagePath, ref: BRANCH });
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER, repo: REPO, path: imagePath, message: `Update image: ${imagePath}`,
      content: base64, sha: data.sha, branch: BRANCH
    });
  } catch {
    await octokit.repos.createOrUpdateFileContents({
      owner: OWNER, repo: REPO, path: imagePath, message: `Add image: ${imagePath}`,
      content: base64, branch: BRANCH
    });
  }
};

app.post('/api/github-commit', async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(401).json({ success: false, error: 'GITHUB_TOKEN not configured' });

  const octokit = new Octokit({ auth: token });

  try {
    const { type } = req.body;

    if (type === 'member') {
      const { name, division, position, slug, photo } = req.body;
      const { content, sha } = await getFile(octokit, 'public/data/members.json');
      const existingDiv = content.find(d => d.division === division);
      if (existingDiv) {
        existingDiv.members.push({ name, position, slug });
      } else {
        content.push({ id: content.length + 1, division, members: [{ name, position, slug }] });
      }
      await saveFile(octokit, 'public/data/members.json', content, sha, `Add member: ${name}`);
      if (photo) await saveImage(octokit, `public/storage/profile/${slug}.jpg`, photo);
      return res.json({ success: true });
    }

    if (type === 'gallery') {
      const { title, description, image } = req.body;
      const { content, sha } = await getFile(octokit, 'public/data/gallery.json');
      content.push({
        id: content.length + 1,
        title, description, image,
        date: new Date().toISOString().split('T')[0]
      });
      await saveFile(octokit, 'public/data/gallery.json', content, sha, `Add gallery: ${title}`);
      return res.json({ success: true });
    }

    if (type === 'program') {
      const { title, description, status, startDate, endDate } = req.body;
      const { content, sha } = await getFile(octokit, 'public/data/programs.json');
      content.push({
        id: content.length + 1,
        title, description, status: status || 'upcoming',
        startDate: startDate || '', endDate: endDate || ''
      });
      await saveFile(octokit, 'public/data/programs.json', content, sha, `Add program: ${title}`);
      return res.json({ success: true });
    }

    if (type === 'settings') {
      const { whatsapp, instagram, email } = req.body;
      const { content, sha } = await getFile(octokit, 'public/data/settings.json');
      if (whatsapp) content.whatsapp = whatsapp;
      if (instagram) content.instagram = instagram;
      if (email) content.email = email;
      await saveFile(octokit, 'public/data/settings.json', content, sha, 'Update web settings');
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

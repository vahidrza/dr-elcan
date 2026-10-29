const OWNER = 'vahidrza';
const REPO  = 'dr-elcan';

function headers() {
  return {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'BakuEsteticAdmin/1.0'
  };
}

async function getJson(path) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, { headers: headers() });
  if (!res.ok) throw new Error(`GitHub GET ${path} → ${res.status}`);
  const { content, sha } = await res.json();
  return { data: JSON.parse(Buffer.from(content, 'base64').toString('utf8')), sha };
}

async function putJson(path, data, sha, msg) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({
      message: msg,
      content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
      sha
    })
  });
  if (!res.ok) throw new Error(`GitHub PUT ${path} → ${res.status}`);
}

async function putBinary(path, base64data, msg) {
  let sha;
  const check = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, { headers: headers() });
  if (check.ok) sha = (await check.json()).sha;

  const body = { message: msg, content: base64data };
  if (sha) body.sha = sha;

  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`GitHub upload ${path} → ${res.status}`);
}

module.exports = { getJson, putJson, putBinary };

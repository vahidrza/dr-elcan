const { putBinary } = require('./_github');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};
const json = (code, body) => ({ statusCode: code, headers: { ...CORS, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

function checkAuth(event) {
  const h = (event.headers['authorization'] || '').replace(/^Bearer\s+/i, '');
  return h === process.env.ADMIN_PASSWORD;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS };
  if (!checkAuth(event)) return json(401, { error: 'Unauthorized' });
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  try {
    const { path, content } = JSON.parse(event.body);
    if (!path || !content) return json(400, { error: 'path and content required' });

    const ext = path.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      return json(400, { error: 'Only jpg/png/webp allowed' });
    }

    await putBinary(path, content, `Admin: upload ${path}`);
    return json(200, { success: true, path });
  } catch (e) {
    return json(500, { error: e.message });
  }
};

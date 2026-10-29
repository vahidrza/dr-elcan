const { getJson, putJson } = require('./_github');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS'
};
const json = (code, body) => ({ statusCode: code, headers: { ...CORS, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

function checkAuth(event) {
  const h = (event.headers['authorization'] || '').replace(/^Bearer\s+/i, '');
  return h === process.env.ADMIN_PASSWORD;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS };
  if (!checkAuth(event)) return json(401, { error: 'Unauthorized' });

  try {
    if (event.httpMethod === 'GET') {
      const { data } = await getJson('data/gallery.json');
      return json(200, data);
    }
    if (event.httpMethod === 'POST') {
      const item = JSON.parse(event.body);
      const { data, sha } = await getJson('data/gallery.json');
      data.push(item);
      await putJson('data/gallery.json', data, sha, `Admin: add gallery item ${item.id}`);
      return json(200, { success: true });
    }
    if (event.httpMethod === 'DELETE') {
      const { id } = JSON.parse(event.body);
      const { data, sha } = await getJson('data/gallery.json');
      const updated = data.filter(i => i.id !== id);
      await putJson('data/gallery.json', updated, sha, `Admin: delete gallery item ${id}`);
      return json(200, { success: true });
    }
    return json(405, { error: 'Method not allowed' });
  } catch (e) {
    return json(500, { error: e.message });
  }
};

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    res.status(200).json({
        status: 'OK',
        message: 'API Bragantec funcionando',
        timestamp: new Date().toISOString(),
        environment: 'Vercel Serverless'
    });
}
export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    res.status(200).json({
        status: 'healthy',
        message: 'API Bragantec funcionando com segurança ativada',
        timestamp: new Date().toISOString(),
        environment: 'Vercel Serverless',
        security: {
            cors: 'enabled',
            rateLimit: 'enabled',
            authentication: 'enabled',
            validation: 'enabled'
        },
        version: '2.0.0'
    });
}
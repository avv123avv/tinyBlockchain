export default function (req, res, next) {
    req.isAuthenticated() ? next() : res.status(403).json({ error: 'failed to make api call, unauthorized.' })
}

const db = require('../db/config')

const dashboardData = async (req, res) => {

    const cookies = req.cookies.token
    console.log(cookies)




    try {
        const pool = db();

        const result = await pool.query("SELECT * FROM links");

        const statsRes = await pool.query(`
      SELECT
        COUNT(*) AS total_links,
        SUM(clicks) AS total_clicks,
       
        COUNT(*) FILTER (WHERE is_active) AS active_links,
        COUNT(*) FILTER (WHERE NOT is_active) AS inactive_links,
        SUM(CASE WHEN last_clicked::date = CURRENT_DATE THEN 1 ELSE 0 END) AS clicked_today
       
      FROM links
    `);

        const s = statsRes.rows[0];

        const statsArray = [
            { title: "Total Links", value: s.total_links },
            { title: "Active Links", value: s.active_links },
            { title: "Inactive Links", value: s.inactive_links },
            { title: "Total Clicks", value: s.total_clicks },

            { title: "Clicked Today", value: s.clicked_today },

        ];

        res.json({
            status: "ok",
            data: {
                links: result.rows,
                stats: statsArray
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "fail", data: null });
    }
};

module.exports = {
    dashboardData
}
const db = require('../db/config')

const getAllLinks = async (req, res) => {
    try {
        const pool = db();
        const result = await pool.query("SELECT * from links")
        res.json({ status: "ok", data: result.rows })
    } catch (error) {
        res.json({ status: "fail", data: result.rows })
    }
}

const checkLinkAvailability = async (req, res) => {
    const code = req.params.code
    console.log(code)
    try {
        const pool = db();
        const result = await pool.query("SELECT * FROM links WHERE code = $1 LIMIT 1", [code]);
        if (result.rows.length === 0) {
            res.json({ status: "empty", data: result.rows })
        }
        else {
            res.json({ status: "ok", data: result.rows })
        }

    } catch (error) {
        console.log(error)
        res.json({ status: "fail", data: null })
    }
}
const viewLink = async (req, res) => {
    const code = req.params.code
    console.log(code)
    try {
        const pool = db();
        const result = await pool.query("SELECT * FROM links WHERE code = $1 LIMIT 1", [code]);
        if (result.rows.length === 0) {
            res.json({ status: "empty", data: result.rows })
        }
        else {
            res.json({ status: "ok", data: result.rows })
        }

    } catch (error) {
        console.log(error)
        res.json({ status: "fail", data: null })
    }
}

const createLink = async (req, res) => {
    const body = req.body
    console.log(body)
    const { code, url } = body
    try {
        const pool = db();

        const ifExist = await pool.query("SELECT * FROM links where code = $1 LIMIT 1", [code])
        if (ifExist.rows.length === 0) {
            const result = await pool.query(
                `INSERT INTO links (code, url, clicks, created_at, updated_at)
                 VALUES ($1, $2, 0, NOW(), NOW())
                 RETURNING *`,
                [code, url]
            );

            res.status(201).json({ status: "ok", data: result.rows[0] })
        }
        else {
            res.status(404).json({ status: "already_exists", data: null })
        }

    } catch (error) {
        console.log(error)
        res.json({ status: "fail", data: null })
    }
}
const updateClick = async (req, res) => {
    console.log("Update Request Received")
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ status: "fail", data: "Missing code" });
    }

    try {
        const pool = db();

        // Increment clicks if link exists
        const result = await pool.query(`UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code=$1 RETURNING *`,  [code] );

        if (result.rows.length === 0) {
            // Code not found
            return res.status(404).json({ status: "not_found", data: null });
        }

        res.status(200).json({ status: "ok", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "fail", data: null });
    }
};
const updateData = async (req, res) => {
    console.log("Update Request Received")
    const { code, url } = req.body;

    if (!code) {
        return res.status(400).json({ status: "fail", data: "Missing code" });
    }

    try {
        const pool = db();

        // Increment clicks if link exists
        const result = await pool.query(
            `UPDATE links
             SET url = $1,
                 updated_at = NOW()
             WHERE code = $2
             RETURNING *`,
            [url, code]
        );

        if (result.rows.length === 0) {
            // Code not found
            return res.status(404).json({ status: "not_found", data: null });
        }

        res.status(200).json({ status: "ok", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "fail", data: null });
    }
};



const dashboardData = async (req, res) => {
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
    getAllLinks, checkLinkAvailability, createLink, viewLink, updateClick, updateData, dashboardData
}
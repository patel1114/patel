const svgCaptcha = require("svg-captcha");

function generateCaptcha(req, res) {
    const captcha = svgCaptcha.create({
        size: 6,
        noise: 3,
        color: true
    });
    req.session.captcha = captcha.text;
    res.type("svg");
    res.status(200).send(captcha.data);
}

function verifyCaptcha(req, res, next) {
    const { captcha } = req.body;

    if (!captcha || !req.session.captcha) {
        return res.status(400).json({ 
            success: false,
            message: "CAPTCHA is required." 
        });
    }

    if (captcha !== req.session.captcha) {
        return res.status(400).json({ 
            success: false,
            message: "Incorrect CAPTCHA. Please try again." 
        });
    }

    next();
}

module.exports = { generateCaptcha, verifyCaptcha };
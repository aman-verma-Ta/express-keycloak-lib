const helmet = require('helmet');
module.exports = helmet({
    contentSecurityPolicy: false,
    frameguard: { action: 'deny' },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin'
}
});
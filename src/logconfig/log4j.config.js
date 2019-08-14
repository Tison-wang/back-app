var log4js = require('log4js');

/**
 * 日志配置
 */
log4js.configure({
    appenders: {
        ruleConsole: {type: 'console'},
        ruleFile: {
            type: 'dateFile',
            filename: 'logs/server-',
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 3,
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {appenders: ['ruleConsole', 'ruleFile'], level: 'info'}
    }
});

module.exports = log4js;

/**
 logger 是log4js的实例
 var logger = log4js.getLogger("test-log");
 logger.trace('this is trace');
 logger.debug('this is debug');
 logger.info('this is info');
 logger.warn('this is warn');
 logger.error('this is error');
 logger.fatal('this is fatal');
 */

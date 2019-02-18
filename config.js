/*
* Create and export configuration variables
*
*/

// Container for all the environments.
var environments = {};

// Staging (default) envitonment
environments.staging = {
    'http' : 3000,
    'envName' : 'staging'
};

// Production environment
environments.production = {
    'httport' : 5000,
    'envName' : 'production'
};

// Detwermine whitch envionment was passed as command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environment abov, if not, default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the modlule 
 module.exports = environmentToExport;

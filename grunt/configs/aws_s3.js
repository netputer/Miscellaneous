module.exports = function (grunt) {
    if (grunt.config.data.paths.project === 'xxx') {
        grunt.fatal('Project name has not been set correctly! ');
    }

    var AWS_CONFIG = grunt.file.readJSON('OathKeeper/frontend/aws.json');

    var expireDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);

    grunt.config.set('aws_s3', {
        options: {
            accessKeyId: AWS_CONFIG.accessKeyId,
            secretAccessKey: AWS_CONFIG.secretAccessKey,
            region: 'cn-north-1',
            uploadConcurrency: 5,
            signatureVersion: 'v4'
        },
        staging: {
            options: {
                bucket: 'web-statics-staging',
                differential: true,
                params: {
                    CacheControl: 'max-age=43200',
                    Expires: expireDate
                }
            },
            files: [{
                expand: true,
                cwd: '<%= paths.dist %>',
                src: ['**', '!**/*.css', '!**/*.js', '!**/*.js.map'],
                dest: '<%= paths.project %>/'
            }, {
                expand: true,
                cwd: 'gzip',
                src: ['**'],
                dest: '<%= paths.project %>/',
                params: {
                    ContentEncoding: 'gzip'
                }
            }]
        },
        production: {
            options: {
                bucket: 'web-statics-production',
                differential: true,
                params: {
                    CacheControl: 'max-age=43200',
                    Expires: expireDate
                }
            },
            files: [{
                expand: true,
                cwd: '<%= paths.dist %>',
                src: ['**', '!**/*.css', '!**/*.js', '!**/*.js.map'],
                dest: '<%= paths.project %>/'
            }, {
                expand: true,
                cwd: 'gzip',
                src: ['**'],
                dest: '<%= paths.project %>/',
                params: {
                    ContentEncoding: 'gzip'
                }
            }]
        }
    });
};
